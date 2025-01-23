import React, { useEffect } from 'react'
import { View,StyleSheet, Text, Touchable, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import HomeHeader from './headers/Home'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Button } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import ScrollableTabViewPage2 from './scrollableTabView';
import NewArrivals from './NewArrivals';
import TileScrolling from './TileScrolling';
import { fetchCart } from '@/redux/thunks/cartThunks';
import CategorySection from './CategorySection';

// import MostViewed from './MostViewed';


interface Product {
  _id: string;
  image_url: string;
  name: string;
  price: number;
}


function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [data, setData] = React.useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://spareparts-backend.vercel.app/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const results = await response.json();
      setData(results);
      // console.log(results);
    }
    fetchData();
    
  }, []);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);



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



  const handleLogout = () => {
    // Perform logout logic here
    // For example, you can clear user data from AsyncStorage or reset Redux state
    dispatch(logout());
    router.replace('/login');
  }




  const router = useRouter();
  return (
    <View style={styles.homeContainer}>
        <HomeHeader/>
        {/* <TileScrolling/> */}
        <ScrollView>
          <CategorySection/>
          {/* <NewArrivals/> */}
          {/* <ScrollableTabViewPage2/> */}
        </ScrollView>
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
