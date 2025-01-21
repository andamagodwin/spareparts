
import React, { useEffect, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../redux/thunks/cartThunks';
import { RootState } from '../../redux/store';
import { AppDispatch } from '../../redux/store';
import {
  cartItemsSelector,
  cartTotalPriceSelector,
  cartTotalQuantitySelector,
} from '../../redux/slices/cartSlice';



function index() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector(cartItemsSelector);
  const totalQuantity = useSelector(cartTotalQuantitySelector);
  const totalPrice = useMemo(() => {
    // Calculate totalPrice based on cart items
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return totalPrice;
  }, [cart]); // Re-compute totalPrice only if cart changes

  // const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (cart.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Your cart is empty!</Text>
      </View>
    );
  }
  function generateRandomKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={generateRandomKey} 
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
          </View>
        )}
      />
      <View>
        <Text>
          Quantity:{totalQuantity}
        </Text>
        <Text>
          Total: {totalPrice}
        </Text>
      </View>
        
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  emptyText: {
    color: '#888',
    fontSize: 18,
  },
  cartItem: {
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#6200ea',
  },
  productQuantity: {
    fontSize: 14,
    color: '#555',
  },
});




export default index
