import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import TileScrolling from './TileScrolling'; // Update the path as needed

interface Product {
  _id: string;
  image_url: string;
  name: string;
  price: number;
}

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch('https://spareparts-backend.vercel.app/api/products/new/arrivals?limit=10');
        const data = await response.json();
        setNewArrivals(data);
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  const handleSeeAll = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New Arrivals</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />
      ) : (
        <View style={styles.cardsContainer}>
        <TileScrolling
          items={newArrivals.map((item) => (
            <TouchableOpacity key={item._id} style={styles.card}>
              <Image source={{ uri: item.image_url }} style={styles.image} />
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
    // backgroundColor: 'red',
    height: 200,
    width: '100%',
    backgroundColor: '#fff',
  },
  cardsContainer: {
    // paddingHorizontal: 10,
    // backgroundColor: 'green',
    // height: 200,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '',
    fontWeight: '600',
  },
  loader: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    width: 140,
    height: 160,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '90%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'PoppinsRegular',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d2c214',
  },
});

export default NewArrivals;
