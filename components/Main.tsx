import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { supabase } from '../utils/supabase';
import { styles } from '../utils/styles';

export default function Main() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
    // The sign out will be handled by the auth state listener in App.js
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={localStyles.content}>
        <Text style={localStyles.text}>You are signed in</Text>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.darkButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});