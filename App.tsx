import React, { useState } from 'react';
import { View, Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import Main from './components/Main';
import { styles } from './utils/styles';

export default function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const player = useVideoPlayer(require('./assets/video.mp4'), p => { p.loop = true; p.play(); });

  if (showMain) {
    return <Main />;
  }

  return (
    <LinearGradient
      colors={['#000', '#1a0033', '#4b0082']}
      style={styles.container}
      locations={[0, 0.7, 1]}
    >
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.logoContainer, { position: 'relative', zIndex: 2 }]}> 
            {!showSignUp && (
              <VideoView player={player} style={styles.videoTop} />
            )}
            <Image source={require('./assets/capturgo.png')} style={styles.logo} />
          </View>
          {showSignUp ? (
            <SignUp onSignIn={() => setShowSignUp(false)} onSignUpSuccess={() => setShowMain(true)} />
          ) : (
            <SignIn onSignUp={() => setShowSignUp(true)} onSignInSuccess={() => setShowMain(true)} />
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

