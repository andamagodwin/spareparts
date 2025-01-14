import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Index() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isMounted, setIsMounted] = useState(false); // For ensuring safe navigation

  // Set the component as mounted
  useEffect(() => {
    setIsMounted(true); 
  }, []);

  // Redirect logic after component is mounted
  useEffect(() => {
    if (isMounted) {
      if (isLoggedIn && user) {
        router.replace('/(tabs)');  // Navigate to the main screen
      } else if (!isLoggedIn) {
        router.replace('/login');  // Navigate to login if not logged in
      }
    }
  }, [isMounted, isLoggedIn, user, router]); // Dependency on `isMounted`, `user`, `isLoggedIn`, and `router`

  // Show loading state while checking user authentication status
  if (!user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop:40 }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Splash screen</Text>
    </View>
  );
}
