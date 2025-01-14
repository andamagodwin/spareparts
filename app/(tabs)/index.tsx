import { useState, useEffect } from 'react'
import Home from '@/components/Home'
import { Button, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'


export default function HomeScreen() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  
  const router = useRouter();

  

  

  return (
    <View style={{ paddingTop: 40}}>
        <Button title="Log In" onPress={() => router.replace('/login')} />
        <Button title="Signup" onPress={() => router.replace('/signup')} />
        <Home/>
        
    </View>
  )
}