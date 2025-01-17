import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface Product {
    _id: string;
    image_url: string;
    name: string;
    price: number;
  }





export default function CategoryProductsComponent({ category }: { category: string }) {
  const [products, setProducts] = React.useState<Product[]>([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(
          `https://spareparts-backend.vercel.app/api/products?category=${category}`
        );
        const results = await response.json();
        setProducts(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.productItem}>
          <Text>{item.name}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  productItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 5,
  },
});
