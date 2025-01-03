import Account from '@/components/Account'
import { supabase } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'






function index() {



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
        {session  && session.user ? 
        <Account key={session.user.id} session={session} /> : null}
      
    </View>
  )
}

export default index
