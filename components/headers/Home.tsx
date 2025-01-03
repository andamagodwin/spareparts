
import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'

function HomeHeader() {

    const router = useRouter();


  return (
    <View style= {styles.headerContainer}>
        <View style={styles.profileBtn}>
            <Button title='Profile' onPress={()=> router.push('/profile')} />
        </View>

        
        <Text>Header</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 100,
    backgroundColor: 'yellow'
  },
  profileBtn: {
    width: 100,
    marginTop: 20,
    backgroundColor: 'red'
  }
})



export default HomeHeader
