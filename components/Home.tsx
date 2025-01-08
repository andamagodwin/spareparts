import React, { useEffect } from 'react'
import { View,StyleSheet, Text, Touchable, TouchableOpacity, Image, FlatList } from 'react-native'
import HomeHeader from './headers/Home'
import { useRouter } from 'expo-router'

function Home() {

  const [data,setData] = React.useState([]);

  useEffect(() => {

    async function fetchData() {
      const response = await fetch('https://api.unsplash.com/search/photos?page=1&query=engines', {
        method: 'GET',
        headers: {
          Authorization: 'Client-ID EmgqwtDS5t9wIMiT6bSrkQeO9xkkpoql4aMSygAOD7U',
          'Content-Type': 'application/json',
          'Accept-Version': 'v1',
        }
      });
      const json = await response.json();
      setData(json.results);
      console.log(json.results);
    }
    fetchData();
    
  }, []);







  const router = useRouter();
  return (
    <View style={styles.homeContainer}>
        <HomeHeader/>
        <FlatList
          data={data}
          // style={styles.productList}
          contentContainerStyle={styles.productList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/products/${item.id}`)}>
              <View style={styles.productCard}>
                <Image src={item.urls.full} style={{width: 150, height: 150,borderRadius: 10}} />
                <Text>Product Name</Text>
              <Text>Product Price</Text>
            </View>
            </TouchableOpacity>
            
          )}
          keyExtractor={(item) => item.id}
        />
        {/* {
          data.map((item) => (
            <View key={item.id}>
              <Image src={item.urls.full} style={{width: 200, height: 200}} />

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
    // backgroundColor: 'red',
  },
  productList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'space-evenly',
    paddingTop: 20,
    // height: '100%',
    gap: 10,
    alignItems:'center',
    backgroundColor: 'white',
  },
  productCard: {
    margin: 5,
    borderWidth:1,
    padding: 8,
    borderRadius: 10,
    borderColor: '#d4d4d4'
  }

})



export default Home
