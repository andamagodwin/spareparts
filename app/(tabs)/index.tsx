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
    <View>
        <Home/>
        
    </View>
  )
}