import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../utils/styles';
import { supabase } from '../utils/supabase';

export function SignUp({ onSignIn, onSignUpSuccess }: { onSignIn?: () => void; onSignUpSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    username: '',
    ageRange: '',
    gender: '',
    commuteMode: '',
    acceptTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const ageRanges = ["Under 18", "18-25", "26-40", "40+"];
  const genders = ["Male", "Female", "Other"];
  // Define commute modes with their corresponding Ionicons names
  const commuteModes = [
    { name: "Car", icon: "car" },
    { name: "Bike", icon: "bicycle" },
    { name: "Train", icon: "train" },
    { name: "Bus", icon: "bus" },
    { name: "Walk", icon: "walk" }
  ];

  const handleSignUp = async () => {
    setError(null);
    setSuccess(false);
    if (!formData.acceptTerms) {
      setError('Please accept the terms.');
      return;
    }
    if (!formData.email || !formData.password || !formData.username) {
      setError('Fill all required fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    // Disable email verification by setting emailRedirectTo: null and/or email_confirm: false (if supported)
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          username: formData.username,
          referral_code: formData.referralCode,
          age_range: formData.ageRange,
          gender: formData.gender,
          commute_mode: formData.commuteMode,
        },
      },
    });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
    } else {
      setSuccess(true);
      setError(null);
      if (onSignUpSuccess) onSignUpSuccess();
      // Optionally: clear form or auto-sign in
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Complete the form below to unlock CapturGo and start earning.</Text>
      </View>

        {/* Main Form Fields */}
        <View style={styles.formSection}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#fff"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#fff"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#fff"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Referral Code (optional)"
            placeholderTextColor="#fff"
            value={formData.referralCode}
            onChangeText={(text) => setFormData({ ...formData, referralCode: text })}
          />
        </View>

        {/* Username Field */}
        <View style={styles.formSection}>
          <TextInput
            style={styles.input}
            placeholder="Public Username"
            placeholderTextColor="#fff"
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
          />
        </View>

        {/* Demographics Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Age Range</Text>
          <View style={styles.buttonGroup}>
            {ageRanges.map((age) => (
              <TouchableOpacity
                key={age}
                style={[
                  styles.selectionButton,
                  formData.ageRange === age && styles.selectedButton
                ]}
                onPress={() => setFormData({ ...formData, ageRange: age })}
              >
                <Text style={styles.whiteButtonText}>{age}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Gender</Text>
          <View style={styles.buttonGroup}>
            {genders.map((gender) => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.selectionButton,
                  formData.gender === gender && styles.selectedButton
                ]}
                onPress={() => setFormData({ ...formData, gender: gender })}
              >
                <Text style={styles.whiteButtonText}>{gender}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Primary Commute Mode</Text>
          <View style={styles.buttonGroup}>
            {commuteModes.map((mode) => (
              <TouchableOpacity
                key={mode.name}
                style={[
                  styles.selectionButton,
                  formData.commuteMode === mode.name && styles.selectedButton
                ]}
                onPress={() => setFormData({ ...formData, commuteMode: mode.name })}
              >
                <Ionicons name={mode.icon as any} size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.whiteButtonText}>{mode.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Terms Acceptance */}
        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setFormData({ ...formData, acceptTerms: !formData.acceptTerms })}
        >
          <Text style={styles.termsText}>
            I accept CapturGo <Text style={styles.termsBold}>Terms & Privacy</Text>
          </Text>
          <View style={[styles.checkbox, formData.acceptTerms && styles.checkboxChecked]}>
            {formData.acceptTerms && <Ionicons name="checkmark" size={18} color="#000" />}
          </View>
        </TouchableOpacity>

        {/* Create Account Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#272a32" />
          ) : (
            <Text style={styles.darkButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        {success && (
          <Text style={styles.successText}>Account created successfully.</Text>
        )}

        {/* Sign In Link */}
        <TouchableOpacity style={styles.linkContainer} onPress={onSignIn}>
          <Text style={styles.bodyText}>Already have a login? Sign in here</Text>
        </TouchableOpacity>
    </>
  );
}
