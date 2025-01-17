
import { supabase } from '@/lib/supabase'
import { RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';






function index() {
  const user = useSelector((state: RootState) => state.auth.user);
    



  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Text>Profile</Text>
        
        <Image source={{ uri: user?.profileImage }} style={styles.profileImage} />
        <View>
          <Text>{user?.name}</Text>
          <Text>{user?.email}</Text>
        </View>
        
      </View>
      
    </View>
  )
}



const styles= StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingVertical:'10%'
  },
  profileImageContainer: {
    alignItems: 'center',
    // marginBottom: 20,
    backgroundColor: '#eaf',
    width:'100%',
    height:'30%',
    display:'flex',
    justifyContent:'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
})



export default index
