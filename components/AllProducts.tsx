import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NewArrivals from './NewArrivals';

interface Product {
    _id: string;
    image_url: string;
    name: string;
    price: number;
  }


export default function AllProductsComponent() {
  const [products, setProducts] = React.useState<Product[]>([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch('https://spareparts-backend.vercel.app/api/products');
        const results = await response.json();
        setProducts(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <>
      
      {/* <NewArrivals/> */}
      
      <FlatList
      data={products}
      contentContainerStyle={styles.productList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => router.push(`/products/${item._id}`)}>
            <View style={styles.productCard}>
              <View style={{zIndex:1,display:'flex',justifyContent:'center',alignItems:'center',position:'absolute',borderRadius: 15,width:35,height:35,backgroundColor:'#fff'}}>
                <Ionicons name="heart-outline" size={24} color="black" />
              </View>
              <Image src={item.image_url} style={{width: 150, height: 150,borderRadius: 10}} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.price}> ugx {item.price}</Text>
              <TouchableOpacity style={styles.addToCartButton}>
                <Text style={{color:'white',fontSize:12,fontFamily:'PoppinsRegular'}}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
            </TouchableOpacity>
      )}
    />
    </>
    
  );
}

const styles = StyleSheet.create({

  productItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginVertical: 2,
    borderRadius: 5,
  },
  addToCartButton: {
    marginTop: 5,
    padding: 8,
    backgroundColor: '#e6a418',
    borderRadius: 5,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  productCard: {
    margin: 2,
    borderWidth:1,
    padding: 8,
    borderRadius: 10,
    borderColor: '#d4d4d4'
  },
  price:{
    color: '#ef0e0e',
    fontSize: 10,
    fontFamily:'PoppinsRegular'
  },
  productName: {
    // marginTop: 5,
    fontSize: 13,
    color: '#000',
    fontFamily:'PoppinsRegular'
  },
  productList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center',
    paddingTop: 20,
    // height: '100%',
    gap: 5,
    alignItems:'center',
    backgroundColor: 'white',
  },
});
