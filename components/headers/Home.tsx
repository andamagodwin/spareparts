
import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Image } from 'react-native';

function HomeHeader() {

    const router = useRouter();


  return (
    <View style= {styles.headerContainer}>
        <View>
          <Image src="https://avatar.iran.liara.run/public"  style={{width: 50, height: 50, borderColor: '#000', borderWidth: 1, borderRadius: 50, padding: 5}} />
        </View>

        
        <Text>Header</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  profileBtn: {
    width: 100,
    marginTop: 20,
    backgroundColor: 'red'
  }
})



export default HomeHeader
