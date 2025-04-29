import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Modal, Pressable, Linking, Button, Image } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { supabase } from '../utils/supabase';
import { styles as globalStyles } from '../utils/styles';
import EditProfile from './EditProfile';

export default function Main() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [loadingReferralCode, setLoadingReferralCode] = useState(false);
  const [errorReferralCode, setErrorReferralCode] = useState<string | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setMapRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01, // Adjust zoom level as needed
          longitudeDelta: 0.01, // Adjust zoom level as needed
        });
      } catch (error) {
        setErrorMsg('Could not fetch location');
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (modalVisible && !referralCode && !loadingReferralCode) {
      fetchReferralCode();
    }
  }, [modalVisible]);

  const fetchReferralCode = async () => {
    setLoadingReferralCode(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error, status } = await supabase
          .from('profiles')
          .select('referral_code')
          .eq('id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setReferralCode(data.referral_code);
        } else {
          console.log('No profile found for user or referral code missing.');
          setReferralCode('N/A');
        }
      } else {
        console.log('User not logged in.');
        setReferralCode('N/A');
      }
    } catch (error: any) {
      console.error('Error fetching referral code:', error.message);
      setReferralCode('Error');
    } finally {
      setLoadingReferralCode(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      setIsMenuVisible(false);
    }
  };

  let content;

  if (errorMsg) {
    content = <Text style={globalStyles.mainErrorText}>{errorMsg}</Text>;
  } else if (!location || !mapRegion) {
    content = <ActivityIndicator size="large" color="#4b0082" style={{flex: 1}} />;
  } else {
    content = null;
  }

  return (
    <View style={globalStyles.mainContainer}>
      <View style={globalStyles.hamburgerButtonContainer}>
        <Pressable 
          style={globalStyles.hamburgerButton} 
          onPress={() => setIsMenuVisible(!isMenuVisible)} 
        >
          <Text style={globalStyles.hamburgerIconText}>☰</Text>
        </Pressable>
      </View>

      {mapRegion && (
        <MapView
          mapType="standard"
          userInterfaceStyle="dark"
          style={globalStyles.mapView}
          initialRegion={mapRegion}
          showsUserLocation={true}
          followsUserLocation={true}
        >
        </MapView>
      )}
      {content}
      <View style={globalStyles.openModalButtonContainer}>
        <Pressable 
          style={({ pressed }) => [
            globalStyles.openModalButton,
            pressed && globalStyles.openModalButtonPressed
          ]}
          onPress={() => setModalVisible(true)} 
        >
          <Text style={globalStyles.openModalButtonText}>Show Rewards Modal</Text>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={globalStyles.modalBackdrop}>
          <View style={globalStyles.modalView}>
            <Text style={globalStyles.modalTitle}>Earn Rewards!</Text>
            <Text style={globalStyles.modalText}>Your Referral Code:</Text>
            {loadingReferralCode ? (
              <ActivityIndicator size="small" color="#4b0082" />
            ) : (
              <Text style={globalStyles.modalReferralCode}>{referralCode || '...'}</Text>
            )}

            <Pressable
              style={({ pressed }) => [
                globalStyles.modalButtonPrimary,
                pressed && globalStyles.modalButtonPrimaryPressed
              ]}
              onPress={() => {
                const tweetText = `I just joined @captur_network waitlist to earn rewards for my daily navigations! Join me to get early access: https://capturnetwork.xyz${referralCode && referralCode !== 'N/A' && referralCode !== 'Error' ? `\n\nUse my referral code: ${referralCode}` : ''}`;
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
                Linking.openURL(twitterUrl);
              }}
              disabled={loadingReferralCode || !referralCode || referralCode === 'Error'}
            >
              <Text style={globalStyles.modalButtonPrimaryText}>Share on </Text>
              <Image source={require('../assets/x-logo.png')} style={globalStyles.modalButtonIcon} />
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                globalStyles.modalButtonSecondary,
                pressed && globalStyles.modalButtonSecondaryPressed
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={globalStyles.modalButtonSecondaryText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {isMenuVisible && (
        <>
          <Pressable 
            style={globalStyles.menuOverlay} 
            onPress={() => setIsMenuVisible(false)} 
          />
          <View style={globalStyles.menuContainer}>
            <Pressable
              style={({ pressed }) => [
                globalStyles.menuButton,
                pressed && globalStyles.menuButtonPressed
              ]}
              onPress={() => {
                setIsMenuVisible(false);
                setShowEditProfile(true);
              }}
            >
              <Text style={globalStyles.menuButtonText}>Edit Profile</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                globalStyles.menuButton,
                pressed && globalStyles.menuButtonPressed
              ]}
              onPress={handleSignOut}
            >
              <Text style={globalStyles.menuButtonText}>Sign Out</Text>
            </Pressable>
          </View>
        </>
      )}
      
      {showEditProfile && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showEditProfile}
          onRequestClose={() => setShowEditProfile(false)}
          statusBarTranslucent={true}
        >
          <EditProfile onClose={() => setShowEditProfile(false)} />
        </Modal>
      )}
    </View>
  );
}