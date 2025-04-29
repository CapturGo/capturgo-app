import React, { useState, useEffect } from 'react';
import { View, Image, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import Auth from './components/Auth';
import Main from './components/Main';
import { styles } from './utils/styles';
import { supabase } from './utils/supabase';
import { Session } from '@supabase/supabase-js';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const player = useVideoPlayer(require('./assets/video.mp4'), p => { p.loop = true; p.play(); });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (session && session.user) {
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
            <VideoView player={player} style={styles.videoTop} />
            <Image source={require('./assets/capturgo.png')} style={styles.logo} />
          </View>
          <Auth onAuthSuccess={() => null} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
