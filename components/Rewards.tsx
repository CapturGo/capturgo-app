import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  TouchableOpacity, 
  Linking, 
  Image, 
  SafeAreaView, 
  StatusBar, 
  Platform, 
  ScrollView
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabase';
import { styles as globalStyles } from '../utils/styles';
import NavigationBar from './NavigationBar';
import MapBackground from './MapBackground';
import { NavigationProps } from '../App';

// Storage keys
const STORAGE_KEYS = {
  LOCATION_SHARING: 'captur_location_sharing',
  CAPT_BALANCE: 'captur_token_balance'
};

export default function Rewards({ navigation }: NavigationProps) {
  
  // Referral code state
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [loadingReferralCode, setLoadingReferralCode] = useState(false);
  const [errorReferralCode, setErrorReferralCode] = useState<string | null>(null);
  
  // Location sharing and rewards state
  const [isLocationSharingEnabled, setIsLocationSharingEnabled] = useState(true);
  const [captBalance, setCaptBalance] = useState(0);
  
  // Reference to the interval for token increments
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Load saved state from AsyncStorage and fetch referral code on component mount
   */
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        // Load location sharing state
        const savedLocationSharing = await AsyncStorage.getItem(STORAGE_KEYS.LOCATION_SHARING);
        if (savedLocationSharing !== null) {
          setIsLocationSharingEnabled(savedLocationSharing === 'true');
        } else {
          // If no value is stored, default to true and save it
          setIsLocationSharingEnabled(true);
          await AsyncStorage.setItem(STORAGE_KEYS.LOCATION_SHARING, 'true');
        }
        
        // Load CAPT balance from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles') 
            .select('token_balance') 
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching CAPT balance:', error.message);
          } else if (profile?.token_balance !== null && profile?.token_balance !== undefined) {
            setCaptBalance(profile.token_balance);
          } else {
             // Handle case where profile or balance might not exist yet
             console.log('No CAPT balance found for user, defaulting to 0.');
             setCaptBalance(0); 
          }
        } else {
           console.log('User not logged in, cannot fetch CAPT balance.');
           setCaptBalance(0);
        }

      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    };
    
    // Initialize component data
    fetchReferralCode();
    loadSavedState();
    
    // Clean up interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);
  
  /**
   * Handle location sharing state changes and token increments
   * Persists state to AsyncStorage and manages the increment interval
   */
  useEffect(() => {
    // Save location sharing state to AsyncStorage whenever it changes
    const saveLocationSharingState = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.LOCATION_SHARING, isLocationSharingEnabled.toString());
      } catch (error) {
        console.error('Error saving location sharing state:', error);
      }
    };
    
    saveLocationSharingState();
    
    // Handle token increments based on location sharing state
    if (isLocationSharingEnabled) {
      // Start incrementing CAPT tokens when location sharing is enabled
      const maxIncrement = 0.05;
      const intervalId = setInterval(() => {
        setCaptBalance(prevBalance => {
          const randomIncrement = Math.random() * maxIncrement;
          const newBalance = Math.round((prevBalance + randomIncrement) * 100) / 100;

          // Save the updated balance to Supabase
          const saveBalance = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
              const { error } = await supabase
                .from('profiles')
                .update({ token_balance: newBalance })
                .eq('id', session.user.id);

              if (error) {
                console.error('Error saving CAPT balance to Supabase:', error.message);
              }
            }
          };
          saveBalance(); // Call the async function to save
          
          return newBalance;
        });
      }, 1000);
      intervalRef.current = intervalId;
    } else if (intervalRef.current) {
      // Stop incrementing when location sharing is disabled
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Cleanup function to prevent memory leaks
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isLocationSharingEnabled]);
  
  /**
   * Toggle location sharing state
   * The state is automatically persisted via the useEffect hook
   */
  const toggleLocationSharing = () => {
    setIsLocationSharingEnabled(prev => !prev);
  };

  /**
   * Fetch the user's referral code from Supabase
   */
  const fetchReferralCode = async () => {
    setLoadingReferralCode(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch user profile with referral code
        const { data, error, status } = await supabase
          .from('profiles')
          .select('referral_code')
          .eq('id', user.id)
          .single();

        // Handle database errors
        if (error && status !== 406) {
          throw error;
        }

        // Set referral code if found
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
      setErrorReferralCode(error.message);
    } finally {
      setLoadingReferralCode(false);
    }
  };

  /**
   * Share referral code on Twitter
   * Opens Twitter with pre-populated text containing the referral code
   */
  const shareOnTwitter = () => {
    const tweetText = `I just joined @captur_network waitlist to earn rewards for my daily navigations! Join me to get early access: https://capturnetwork.xyz${referralCode && referralCode !== 'N/A' && referralCode !== 'Error' ? `\n\nUse my referral code: ${referralCode}` : ''}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    Linking.openURL(twitterUrl);
  };

  return (
    <SafeAreaView style={[globalStyles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Map Background with overlay - controlled by location sharing toggle */}
      <MapBackground opacity={0.8} showUserLocation={isLocationSharingEnabled} />
      
      <View style={[globalStyles.header, { marginTop: 10, zIndex: 2 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={globalStyles.title}>Rewards</Text>
        </View>
      </View>

      <ScrollView style={[globalStyles.scrollView, { zIndex: 2 }]}>
        {/* CAPT Token Balance Card */}
        <View style={globalStyles.card}>
          <Text style={[globalStyles.sectionTitle, { marginBottom: 8 }]}>Balance</Text>
          
          <View style={globalStyles.balanceContainer}>
            <Image
              source={require('../assets/logo.png')}
              style={globalStyles.balanceIcon}
            />
            <Text style={globalStyles.balanceText}>
              {captBalance.toFixed(2)}
            </Text>
          </View>
                    
          <View style={globalStyles.toggleContainer}>
            <View style={globalStyles.toggleLabelContainer}>
              <MaterialIcons 
                name="location-on" 
                size={24} 
                color={isLocationSharingEnabled ? "#935EFF" : "#666"} 
              />
              <Text style={globalStyles.toggleLabel}>Location Sharing</Text>
            </View>
            
            <TouchableOpacity
              onPress={toggleLocationSharing}
              style={[
                globalStyles.toggleButton,
                isLocationSharingEnabled ? globalStyles.toggleButtonActive : globalStyles.toggleButtonInactive
              ]}
            >
              <View style={[
                globalStyles.toggleThumb,
                isLocationSharingEnabled ? globalStyles.toggleThumbActive : globalStyles.toggleThumbInactive
              ]} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={globalStyles.card}>
          <Text style={[globalStyles.sectionTitle, { marginBottom: 8 }]}>Your Referral Code</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', minHeight: 36 }}>
            {loadingReferralCode ? (
              <ActivityIndicator size="small" color="#935EFF" />
            ) : errorReferralCode ? (
              <Text style={globalStyles.errorText}>{errorReferralCode}</Text>
            ) : (
                <Text style={globalStyles.referralCodeText}>{referralCode || 'N/A'}</Text>
              )}
              <TouchableOpacity
                style={[globalStyles.shareButton, { marginLeft: 12 }]}
                onPress={shareOnTwitter}
                disabled={loadingReferralCode || !referralCode || referralCode === 'Error'}
              >
                <Text style={[globalStyles.whiteButtonText, { marginRight: 8 }]}>Share on </Text>
                <Image source={require('../assets/x-logo.png')} style={globalStyles.shareIcon} />
              </TouchableOpacity>
            </View>   
        </View>

        <View style={globalStyles.card}>
          <Text style={[globalStyles.sectionTitle, { marginBottom: 15 }]}>How to Earn Rewards</Text>
          
          <View style={globalStyles.rewardItem}>
            <Text style={globalStyles.rewardNumber}>1.</Text>
            <Text style={globalStyles.bodyText}>Share your location while navigating</Text>
          </View>
          
          <View style={globalStyles.rewardItem}>
            <Text style={globalStyles.rewardNumber}>2.</Text>
            <Text style={globalStyles.bodyText}>Boost rewards with referrals</Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Navigation Bar */}
      <View style={globalStyles.navBarWrapper}>
        <NavigationBar 
          activeTab="rewards"
          onRewardsPress={() => {}}
          onMapPress={() => navigation.navigate('Main')}
          onProfilePress={() => navigation.navigate('EditProfile')}
        />
      </View>
    </SafeAreaView>
  );
}
