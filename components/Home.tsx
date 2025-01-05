import React, { useEffect } from 'react'
import { View,StyleSheet, Text, Touchable, TouchableOpacity } from 'react-native'
import HomeHeader from './headers/Home'
import { useRouter } from 'expo-router'

function Home() {

  const [data,setData] = React.useState([]);

  // useEffect(() => {

  //   async function fetchData() {
  //     const response = await fetch('https://api.unsplash.com/search/photos?page=1&query=engines', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: 'Client-ID EmgqwtDS5t9wIMiT6bSrkQeO9xkkpoql4aMSygAOD7U',
  //         'Content-Type': 'application/json',
  //         'Accept-Version': 'v1',
  //       }
  //     });
  //     const json = await response.json();
  //     setData(json.results);
  //     console.log(json.results);
  //   }
  //   fetchData();
    
  // }, []);







  const router = useRouter();
  return (
    <View style={styles.homeContainer}>
        <HomeHeader/>
        {/* {
          data.map((item) => (
            <View key={item.id}>
              <Text>{item.slug}</Text>
            </View>
          ))
        } */}
       
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
