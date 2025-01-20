import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SearchBarButton: React.FC = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/search');
};

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#666" style={styles.icon} />
        <Text style={styles.placeholderText}>Search for parts</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f7',
    borderWidth:1,
    borderColor:'#e6e8ee',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    // elevation: 3,
  },
  icon: {
    marginRight: 8,
    color:'#1F41BB'
  },
  placeholderText: {
    fontSize: 13,
    color: '#999',
    fontFamily:'PoppinsRegular'
  },
});

export default SearchBarButton;
