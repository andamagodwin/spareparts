import React from 'react'
import { View,StyleSheet, Text } from 'react-native'
import HomeHeader from './headers/Home'

function Home() {
  return (
    <View style={styles.homeContainer}>
        <HomeHeader/>
        <Text>Home</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  homeContainer: {
    display: 'flex',
    height: '100%',
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor: 'red',
  }
})



export default Home
