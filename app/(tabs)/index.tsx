import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Auth from '@/components/Auth'
import Account from '@/components/Account'
import Home from '@/components/Home'
import { Button, View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'expo-router'

export default function HomeScreen() {
  const router = useRouter();
  
  // const [session, setSession] = useState<Session | null>(null)

  
  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session)
  //   })

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session)
  //   })
  // }, [])

  // if (!session ) {
  //   router.push('/(auth)/login')
  // }

  return (
    <View style={{ paddingTop: 40}}>
        <Button title="Log In" onPress={() => router.replace('/login')} />
        <Button title="Signup" onPress={() => router.replace('/signup')} />
        <Home/>
    </View>
  )
}