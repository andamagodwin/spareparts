import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import store, { AppDispatch, RootState } from '../redux/store';
import { loadUserFromStorage } from '../redux/slices/authSlice';
import { useColorScheme } from '@/hooks/useColorScheme';
import useAuthLoader from '@/hooks/useAuthLoader';
import { useRouter } from 'expo-router';
import { setUser } from '../redux/slices/authSlice';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutInner() {
  useAuthLoader();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    SuperCharge: require('../assets/fonts/supercharge.ttf'),
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadUser = async () => {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        dispatch(loadUserFromStorage(JSON.parse(storedUserData)));
        dispatch(setUser(JSON.parse(storedUserData)));
      }
    };
    loadUser();
  }, [dispatch]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name = "cart" options={{ headerShown: false }} />
        
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {


  return (
    <Provider store={store}>
      <RootLayoutInner />
    </Provider>
  );
}
