import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { styles as globalStyles } from '../utils/styles';

type NavigationBarProps = {
  activeTab: 'rewards' | 'map' | 'profile';
  onRewardsPress: () => void;
  onMapPress: () => void;
  onProfilePress: () => void;
};

const NavigationBar: React.FC<NavigationBarProps> = ({
  activeTab,
  onRewardsPress,
  onMapPress,
  onProfilePress
}) => {
  return (
    <View style={globalStyles.navBarContainer}>
      {/* Rewards Button */}
      <View style={globalStyles.navItemContainer}>
        <TouchableOpacity
          style={[
            globalStyles.navButton,
            activeTab === 'rewards' ? globalStyles.navButtonActive : globalStyles.navButtonInactive
          ]}
          onPress={onRewardsPress}
        >
          <MaterialIcons
            name="card-giftcard"
            size={24}
            color={activeTab === 'rewards' ? "#fff" : "rgba(147, 94, 255, 0.7)"}
          />
          <Text style={globalStyles.navButtonText}>Rewards</Text>
        </TouchableOpacity>
      </View>

      {/* Map Button */}
      <View style={globalStyles.navItemContainer}>
        <TouchableOpacity
          style={[
            globalStyles.navButton,
            activeTab === 'map' ? globalStyles.navButtonActive : globalStyles.navButtonInactive
          ]}
          onPress={onMapPress}
        >
          <FontAwesome5
            name="map-marked-alt"
            size={24}
            color={activeTab === 'map' ? "#fff" : "rgba(147, 94, 255, 0.7)"}
          />
          <Text style={globalStyles.navButtonText}>Map</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Button */}
      <View style={globalStyles.navItemContainer}>
        <TouchableOpacity
          style={[
            globalStyles.navButton,
            activeTab === 'profile' ? globalStyles.navButtonActive : globalStyles.navButtonInactive
          ]}
          onPress={onProfilePress}
        >
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={activeTab === 'profile' ? "#fff" : "rgba(147, 94, 255, 0.7)"}
          />
          <Text style={globalStyles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavigationBar;