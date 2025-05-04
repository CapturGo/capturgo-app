import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabase';
import { styles as globalStyles } from '../utils/styles';
import NavigationBar from './NavigationBar';
import { NavigationProps } from '../App';
// Note: We're not using MapBackground here since we need a fully interactive map

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

  // Request location permissions and initialize map on component mount
  useEffect(() => {
    (async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        // Get current location
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced // Balance between accuracy and battery usage
        });
        
        // Update state with location data
        setLocation(currentLocation);
        setMapRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01, // Adjust zoom level as needed
          longitudeDelta: 0.01, // Adjust zoom level as needed
        });
      } catch (error) {
        setErrorMsg('Could not fetch location');
        console.error('Location error:', error);
      }
    })();
    
    // No cleanup needed as we're not subscribing to location updates
  }, []);
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