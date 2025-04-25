import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from '../utils/styles';
import { supabase } from '../utils/supabase';

function SignIn({ onSignUp, onSignInSuccess }: { onSignUp?: () => void; onSignInSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    identifier: '', // email or username
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setError(null);
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.identifier,
      password: formData.password,
    });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
    } else {
      setError(null);
      if (onSignInSuccess) onSignInSuccess();
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Welcome back to CapturGo!</Text>
      </View>

        <View style={styles.formSection}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#fff"
            value={formData.identifier}
            onChangeText={(text) => setFormData({ ...formData, identifier: text })}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#fff"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#272a32" />
          ) : (
            <Text style={styles.darkButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.linkContainer} onPress={onSignUp}>
          <Text style={styles.bodyText}>Don't have an account? Sign up here</Text>
        </TouchableOpacity>
    </>
  );
}



export { SignIn };
