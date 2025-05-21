import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabase';
import { styles as globalStyles } from '../utils/styles';
import NavigationBar from './NavigationBar';
import { NavigationProps } from '../App';

// Storage keys from Rewards component
const STORAGE_KEYS = {
  LOCATION_SHARING: 'location_sharing_enabled',
  CAPT_BALANCE: 'capt_balance'
};

export default function Main({ navigation }: NavigationProps) {
  // State for location data and map display
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [isLocationSharingEnabled, setIsLocationSharingEnabled] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Get user ID from Supabase session
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error fetching session:', error.message);
          setErrorMsg('Could not retrieve user session.');
          return;
        }
        if (session?.user?.id) {
          setUserId(session.user.id);
        } else {
          setErrorMsg('User not logged in.'); // Or handle appropriately
        }
      } catch (e) {
        console.error('Exception fetching session:', e);
        setErrorMsg('An unexpected error occurred while fetching user data.');
      }
    };
    fetchUserId();
  }, []);

  // Load location sharing state from AsyncStorage
  useEffect(() => {
    const loadLocationSharingState = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(STORAGE_KEYS.LOCATION_SHARING);
        if (storedValue !== null) {
          setIsLocationSharingEnabled(storedValue === 'true');
        } else {
          // If no value is stored, default to true
          setIsLocationSharingEnabled(true);
        }
      } catch (error) {
        console.error('Error loading location sharing state:', error);
      }
    };
    
    loadLocationSharingState();
  }, []);

  // Request permissions, then fetch and update location periodically
  useEffect(() => {
    let locationIntervalId: NodeJS.Timeout | null = null;

    const requestPermissionsAndSetupUpdates = async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        // Function to fetch and update location
        const updateLocation = async () => {
          try {
            const currentLocation = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.Balanced, // Balance between accuracy and battery usage
            });
            
            // Update state with new location data
            setLocation(currentLocation);
            // Update mapRegion to center on the new location, keeping previous zoom level
            setMapRegion((prevRegion) => ({
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: prevRegion?.latitudeDelta || 0.01, // Use previous delta or default
              longitudeDelta: prevRegion?.longitudeDelta || 0.01, // Use previous delta or default
            }));
            setErrorMsg(null); // Clear any previous location error
          } catch (error) {
            setErrorMsg('Could not fetch current location');
            console.error('Error fetching current location:', error);
            // Interval continues, allowing for recovery if the error is transient
          }
        };

        // Fetch initial location immediately
        await updateLocation();

        // Set up interval to update location every second
        locationIntervalId = setInterval(updateLocation, 1000);

      } catch (error) { // Catches errors from requestForegroundPermissionsAsync
        setErrorMsg('Error requesting location permissions');
        console.error('Permission error:', error);
      }
    };

    requestPermissionsAndSetupUpdates();

    // Cleanup interval on component unmount
    return () => {
      if (locationIntervalId) {
        clearInterval(locationIntervalId);
      }
    };
  }, []); // Empty dependency array: runs once on mount to set up permissions and interval

  // Function to send location data to Supabase
  const sendLocationToSupabase = async (locationData: Location.LocationObject, currentUserId: string) => {
    if (!currentUserId) {
      console.log('User ID not available, skipping location send.');
      return;
    }
    try {
      const { error } = await supabase.from('locations').insert([
        {
          user_id: currentUserId,
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        },
      ]);
      if (error) {
        console.error('Error sending location to Supabase:', error.message);
        // Optionally set an error message for the UI, but be mindful of flooding the UI with errors every second
      } else {
        console.log('Location sent to Supabase');
      }
    } catch (e) {
      console.error('Exception sending location to Supabase:', e);
    }
  };

  // Send location to Supabase whenever location updates, if sharing is enabled
  useEffect(() => {
    if (isLocationSharingEnabled && location && userId) {
      sendLocationToSupabase(location, userId);
    }
    // No interval or cleanup needed here as send is triggered by dependency changes
  }, [location, isLocationSharingEnabled, userId]); // Dependencies: location, sharing status, user ID

  // Determine what content to show based on state
  let content;
  if (errorMsg) {
    // Show error message if there was a problem
    content = <Text style={globalStyles.mainErrorText}>{errorMsg}</Text>;
  } else if (!location || !mapRegion) {
    // Show loading indicator while waiting for location
    content = <ActivityIndicator size="large" color="#4b0082" style={{flex: 1}} />;
  } else {
    // No additional content needed when map is showing
    content = null;
  }

  return (
    <View style={globalStyles.mainContainer}>
      {/* Hamburger menu removed as requested */}

      {mapRegion && (
        <MapView
          mapType="standard"
          userInterfaceStyle="dark"
          style={globalStyles.mapView}
          initialRegion={mapRegion}
          showsUserLocation={isLocationSharingEnabled}
          followsUserLocation={isLocationSharingEnabled}
        >
        </MapView>
      )}
      {content}
      {/* Removed the Show Rewards Modal button since it's now in the navigation bar */}

      {/* Rewards modal removed and replaced with Rewards component */}

      {/* Navigation Bar */}
      <NavigationBar 
        activeTab="map"
        onRewardsPress={() => navigation.navigate('Rewards')}
        onMapPress={() => {}}
        onProfilePress={() => navigation.navigate('EditProfile')}
      />
    </View>
  );
}