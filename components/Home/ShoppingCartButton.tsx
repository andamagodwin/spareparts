import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface ShoppingCartButtonProps {
  itemCount: number; // Pass the number of items in the cart as a prop
}

const ShoppingCartButton: React.FC<ShoppingCartButtonProps> = ({ itemCount }) => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push('/cart')}>
      <Feather name="shopping-cart" size={24} color="black" />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#e6a418',
    borderRadius: 10,
    height: 18,
    minWidth: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    borderWidth:2,
    borderColor:'white'
  },
  badgeText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default ShoppingCartButton;
