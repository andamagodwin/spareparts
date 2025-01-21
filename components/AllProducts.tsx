import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'expo-router';
import { addToCart,updateCartItem,removeCartItem } from '@/redux/thunks/cartThunks';

interface Product {
  _id: string;
  image_url: string;
  name: string;
  price: number;
}

export default function AllProductsComponent() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const [isAdded, setIsAdded] = useState<{ [key: string]: boolean }>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [products, setProducts] = useState<Product[]>([]);

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

  const handleAddToCart = (productId: string) => {
    setIsAdded((prev) => ({ ...prev, [productId]: true }));
    setQuantities((prev) => ({ ...prev, [productId]: 1 }));
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const handleIncreaseQuantity = (productId: string) => {
    setQuantities((prev) => {
      const updatedQuantity = (prev[productId] || 1) + 1;
      dispatch(updateCartItem({ productId, quantity: updatedQuantity }));
      return { ...prev, [productId]: updatedQuantity };
    });
  };

  const handleDecreaseQuantity = (productId: string) => {
    setQuantities((prev) => {
      const updatedQuantity = (prev[productId] || 1) - 1;

      if (updatedQuantity <= 0) {
        dispatch(removeCartItem({productId}))
        setIsAdded((prevIsAdded) => ({ ...prevIsAdded, [productId]: false }));
        return { ...prev, [productId]: 0 };
      }

      dispatch(updateCartItem({ productId, quantity: updatedQuantity }));
      return { ...prev, [productId]: updatedQuantity };
    });
  };

  return (
    <FlatList
      data={products}
      contentContainerStyle={styles.productList}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={()=>router.push("/cart")}
        >
          <View style={styles.productCard}>
          <View style={styles.favoriteIcon}>
            <Ionicons name="heart-outline" size={24} color="black" />
          </View>
          <Image src={item.image_url} style={styles.productImage} />
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.price}>ugx {item.price}</Text>

          {isAdded[item._id] ? (
            <View style={styles.quantityManager}>
              <TouchableOpacity
                onPress={() => handleDecreaseQuantity(item._id)}
                style={styles.minusButton}
              >
                <Ionicons name="remove" size={20} color="white" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantities[item._id] || 1}</Text>
              <TouchableOpacity
                onPress={() => handleIncreaseQuantity(item._id)}
                style={styles.plusButton}
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => handleAddToCart(item._id)}
              style={styles.addToCartButton}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
        </TouchableOpacity>
        
      )}
    />
  );
}

const styles = StyleSheet.create({
  favoriteIcon: {
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 15,
    width: 35,
    height: 35,
    backgroundColor: '#fff',
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productCard: {
    margin: 2,
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    borderColor: '#d4d4d4',
  },
  price: {
    color: '#ef0e0e',
    fontSize: 10,
    fontFamily: 'PoppinsRegular',
  },
  productName: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'PoppinsRegular',
  },
  productList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 20,
    gap: 5,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  addToCartButton: {
    marginTop: 5,
    padding: 8,
    backgroundColor: '#e6a418',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'PoppinsRegular',
  },
  quantityManager: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  minusButton: {
    padding: 8,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
  },
  plusButton: {
    padding: 8,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
