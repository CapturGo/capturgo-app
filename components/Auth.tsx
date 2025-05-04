import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { supabase } from '../utils/supabase'
import { Ionicons } from '@expo/vector-icons'
import { styles as globalStyles } from '../utils/styles'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth({ onAuthSuccess }: { onAuthSuccess?: () => void }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [ageRange, setAgeRange] = useState('')
  const [gender, setGender] = useState('')
  const [commuteMode, setCommuteMode] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Define options for signup form
  const ageRanges = ["Under 18", "18-25", "26-40", "40+"]
  const genders = ["Male", "Female", "Other"]
  const commuteModes = [
    { name: "Car", icon: "car" },
    { name: "Bike", icon: "bicycle" },
    { name: "Train", icon: "train" },
    { name: "Bus", icon: "bus" },
    { name: "Walk", icon: "walk" }
  ]

  async function signInWithEmail() {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setError(error.message)
    } else if (onAuthSuccess) {
      onAuthSuccess()
    }
    setLoading(false)
  }

  async function signUpWithEmail() {
    setError(null)
    if (!acceptTerms) {
      setError('Please accept the terms.')
      return
    }
    if (!email || !password || !username) {
      setError('Fill all required fields.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
          referral_code: referralCode,
          age_range: ageRange,
          gender: gender,
          commute_mode: commuteMode,
        },
      },
    })

    if (error) {
      setError(error.message)
    } else if (session) {
      if (onAuthSuccess) onAuthSuccess()
    } else {
      Alert.alert('Please check your inbox for email verification!')
    }
    setLoading(false)
  }

  return (
    <>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>{isSignUp ? 'Create Account' : 'Sign In'}</Text>
        <Text style={globalStyles.subtitle}>
          {isSignUp 
            ? 'Complete the form below to unlock CapturGo and start earning.' 
            : 'Welcome back to CapturGo!'}
        </Text>
      </View>

      {/* Main Form Fields */}
      <View style={globalStyles.formSection}>
        <TextInput
          style={globalStyles.input}
          placeholder="Email Address"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        
        {isSignUp && (
          <>
            <TextInput
              style={globalStyles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#fff"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Referral Code (optional)"
              placeholderTextColor="#fff"
              value={referralCode}
              onChangeText={setReferralCode}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Public Username"
              placeholderTextColor="#fff"
              value={username}
              onChangeText={setUsername}
            />
            
            {/* Demographics Section */}
            <Text style={globalStyles.sectionTitle}>Age Range</Text>
            <View style={globalStyles.buttonGroup}>
              {ageRanges.map((age) => (
                <TouchableOpacity
                  key={age}
                  style={[
                    globalStyles.selectionButton,
                    ageRange === age && globalStyles.selectedButton
                  ]}
                  onPress={() => setAgeRange(age)}
                >
                  <Text style={globalStyles.whiteButtonText}>{age}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={globalStyles.sectionTitle}>Gender</Text>
            <View style={globalStyles.buttonGroup}>
              {genders.map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[
                    globalStyles.selectionButton,
                    gender === g && globalStyles.selectedButton
                  ]}
                  onPress={() => setGender(g)}
                >
                  <Text style={globalStyles.whiteButtonText}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={globalStyles.sectionTitle}>Primary Commute Mode</Text>
            <View style={globalStyles.buttonGroup}>
              {commuteModes.map((mode) => (
                <TouchableOpacity
                  key={mode.name}
                  style={[
                    globalStyles.selectionButton,
                    commuteMode === mode.name && globalStyles.selectedButton
                  ]}
                  onPress={() => setCommuteMode(mode.name)}
                >
                  <Ionicons name={mode.icon as any} size={20} color="#fff" style={globalStyles.buttonIcon} />
                  <Text style={globalStyles.whiteButtonText}>{mode.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Terms Acceptance */}
            <TouchableOpacity
              style={globalStyles.termsContainer}
              onPress={() => setAcceptTerms(!acceptTerms)}
            >
              <Text style={globalStyles.termsText}>
                I accept CapturGo <Text style={globalStyles.termsBold}>Terms & Privacy</Text>
              </Text>
              <View style={[globalStyles.checkbox, acceptTerms && globalStyles.checkboxChecked]}>
                {acceptTerms && <Ionicons name="checkmark" size={18} color="#000" />}
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Action Button */}
      <TouchableOpacity 
        style={globalStyles.button} 
        onPress={isSignUp ? signUpWithEmail : signInWithEmail} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#272a32" />
        ) : (
          <Text style={globalStyles.darkButtonText}>{isSignUp ? 'Create Account' : 'Sign In'}</Text>
        )}
      </TouchableOpacity>
      
      {error && <Text style={globalStyles.errorText}>{error}</Text>}

      {/* Toggle between Sign In and Sign Up */}
      <TouchableOpacity style={globalStyles.linkContainer} onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={globalStyles.bodyText}>
          {isSignUp 
            ? 'Already have an account? Sign in here' 
            : 'Don\'t have an account? Sign up here'}
        </Text>
      </TouchableOpacity>
    </>
  )
}

// No need for local styles as we're using the global styles
