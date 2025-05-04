import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles as globalStyles } from '../utils/styles';

interface MapBackgroundProps {
  opacity?: number; // Overlay opacity (0-1), default 0.9
  showUserLocation?: boolean; // Whether to show the user's location marker
}

/**
 * A reusable map background component with a semi-transparent overlay
 * Can be used as a background for any screen
 */
const MapBackground: React.FC<MapBackgroundProps> = ({
  opacity = 0.9,
  showUserLocation = true
}) => {
  // Map state
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize map location
  useEffect(() => {
    let isMounted = true;
    
    const initializeMap = async () => {
      try {
        // Get current location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced
          });
          
          if (isMounted) {
            setLocation(currentLocation);
            setMapRegion({
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }
        }
      } catch (error) {
        console.error('Location error:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    initializeMap();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {/* Map Background */}
      {mapRegion && (
        <MapView
          mapType="standard"
          userInterfaceStyle="dark"
          style={globalStyles.mapBackgroundView}
          initialRegion={mapRegion}
          showsUserLocation={showUserLocation}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
        />
      )}
      
      {/* Black Overlay */}
      <View style={[
        globalStyles.mapOverlay,
        { backgroundColor: `rgba(0, 0, 0, ${opacity})` }
      ]} />
    </>
  );
};

export default MapBackground;
