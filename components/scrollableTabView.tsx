import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AllProductsComponent from './AllProducts';
import CategoryProductsComponent from './categoryProducts';

const { width } = Dimensions.get('window');



const ICONS: { [key: string]: any } = {
  All: require('../assets/icons/All.png'),
  Brakes: require('../assets/icons/Brakes.png'),
  Accessories: require('../assets/icons/Accessories.png'),
  AirConditioningandHeating: require('../assets/icons/Air Conditioning and Heating.png'),
  BeltsandHoses: require('../assets/icons/Belts and Hoses.png'),
  BodyParts: require('../assets/icons/Body Parts.png'),
  CoolingSystem: require('../assets/icons/Cooling System.png'),
  Electrical: require('../assets/icons/Electrical.png'),
  EngineParts: require('../assets/icons/Engine Parts.png'),
  Exhaust: require('../assets/icons/Exhaust.png'),
  Filters: require('../assets/icons/Filters.png'),
  FuelSystem: require('../assets/icons/Fuel System.png'),
  GasketsandSeals: require('../assets/icons/Gaskets and Seals.png'),
  Interior: require('../assets/icons/Interior.png'),
  Lighting: require('../assets/icons/Lighting.png'),
  SteeringSystem: require('../assets/icons/Steering System.png'),
  Suspension: require('../assets/icons/Suspension.png'),
  Tools: require('../assets/icons/Tools.png'),
  Transmission: require('../assets/icons/Transmission.png'),
  WheelsandTires: require('../assets/icons/Wheels and Tires.png'),
  // Add more categories as needed
  // Add more categories as needed
};



interface Category {
  name: string;
  icon: any; // Replace `any` with the appropriate type for images if needed
}

export default function ScrollableTabViewPage2() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [active, setActive] = useState<number>(0);
  const headerScrollView = useRef<FlatList<Category>>(null);
  const itemScrollView = useRef<FlatList<Category>>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://spareparts-backend.vercel.app/api/categories');
        const results = await response.json();

        // Map categories to include icons
        const categoriesWithIcons: Category[] = [
          { name: 'All', icon: require('../assets/icons/All.png') },
          ...results.map((category: { name: string }) => ({
            name: category.name,
            icon: ICONS[category.name.replace(/\s+/g, '')] || require('../assets/icons/Brakes.png'),

          })),
        ];

        setCategories(categoriesWithIcons);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (headerScrollView.current && categories.length > 0) {
      headerScrollView.current.scrollToIndex({ index: active, viewPosition: 0.5 });
    }
  }, [active, categories]);

  const onPressHeader = (index: number) => {
    if (categories.length > 0 && active !== index) {
      if (itemScrollView.current) {
        itemScrollView.current.scrollToIndex({ index });
      }
      setActive(index);
    }
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(x / width + 0.5);
    if (active !== newIndex) {
      setActive(newIndex);
    }
  };

  if (categories.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Scroll */}
      <FlatList
        data={categories}
        ref={headerScrollView}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        style={styles.headerScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <TouchableOpacity
              onPress={() => onPressHeader(index)}
              style={[
                styles.headerItem,
                { backgroundColor: active === index ? 'white' : 'white' },
              ]}
            >
              <Image source={item.icon} style={styles.icon} />
              <Text
                style={{
                  fontFamily: 'PoppinsRegular',
                  color: active === index ? '#1F41BB' : '#000',
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
            {active === index && <View style={styles.headerBar} />}
          </View>
        )}
      />

      {/* Content Scroll */}
      <FlatList
        data={categories}
        ref={itemScrollView}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        renderItem={({ item }) => (
          <View style={styles.mainItem}>
            {item.name === 'All' ? (
              <AllProductsComponent />
            ) : (
              <CategoryProductsComponent category={item.name} />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerScroll: {
    flexGrow: 0,
    backgroundColor: '#fff',
  },
  headerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 2,
    minWidth: 70,
    borderRadius: 5,
    // borderColor: '#1F41BB',
    // borderWidth: 1,
    margin: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  mainItem: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headerBar: {
    height: 2,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#1F41BB',
    position: 'absolute',
    bottom: 0,
  },
});
