import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Auth from '@/components/Auth'
import Account from '@/components/Account'
import Home from '@/components/Home'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import Register from '../(auth)/register'

export default function HomeScreen() {
  
  const [session, setSession] = useState<Session | null>(null)

  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View>
      {/* <Account key={session.user.id} session={session} /> */}
      {session && session.user ?  <Home/>: <Register />}
    </View>
  )
}