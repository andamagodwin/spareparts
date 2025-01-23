import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';

const categories = [
  { id: '1', name: 'All', icon: <Ionicons name="apps-outline" size={24} color="#000" /> },
  { id: '2', name: 'Car', icon: <FontAwesome5 name="car" size={24} color="#000" /> },
  { id: '3', name: 'Motorbike', icon: <Fontisto name="motorcycle" size={24} color="black" /> },
  { id: '4', name: 'Truck', icon: <FontAwesome5 name="truck-moving" size={24} color="black" /> },
  { id: '5', name: 'Bus', icon: <Ionicons name="bus-outline" size={24} color="#000" /> },
  { id: '6', name: 'Bus', icon: <Ionicons name="bus-outline" size={24} color="#000" /> },
  { id: '7', name: 'Bus', icon: <Ionicons name="bus-outline" size={24} color="#000" /> },
];



interface CategoryItem {
    id: string;
    name: string;
    icon: React.ReactElement;
}



export default function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState('1'); // Default to 'All'

  const renderCategory = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      {item.icon}
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {categories.map((category) => renderCategory({ item: category }))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    backgroundColor: 'red',
    width:'100%',
    display:'flex',
    flexDirection:'column',

  },
  listContainer: {
    alignItems: 'center',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    width:100,
    gap:11,
    padding: 8,
    // borderWidth: 1,
    // borderColor: '#deb6b6',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    elevation: 2
  },
  selectedCategory: {
    backgroundColor: '#e7dbdb', // Purple for selected category
  },
  categoryText: {
    marginTop: 5,
    fontSize: 11,
    color: '#000',
    fontFamily:'PoppinsRegular'
  },
  selectedText: {
    color: '#000', // White text for selected category
  },
});
