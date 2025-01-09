import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Product {
    id: number;
    name: string;
    image: string;
  }
  



const fakeProducts = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Spare Part ${index + 1}`,
  image: `https://via.placeholder.com/150?text=Part+${index + 1}`,
}));

function MostViewed() {
  const [visibleProducts, setVisibleProducts] = useState(fakeProducts.slice(0, 5));

  const loadMore = () => {
    const currentLength = visibleProducts.length;
    const nextProducts = fakeProducts.slice(currentLength, currentLength + 5);
    setVisibleProducts([...visibleProducts, ...nextProducts]);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Most Viewed</Text>
        <TouchableOpacity onPress={() => alert('View more clicked')}>
          <MaterialIcons name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={visibleProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
    elevation: 2,
    height: 190
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 5,
  },
  productCard: {
    marginRight: 15,
    width: 120,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default MostViewed;
