import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
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

let animationActive = true;
let animationActiveRef: NodeJS.Timeout | null = null;

export default function ScrollableTabViewPage2() {
  const [data, setData] = useState<string[]>([]);
  const [active, setActive] = useState<number>(0);
  const headerScrollView = useRef<FlatList<string>>(null);
  const itemScrollView = useRef<FlatList<string>>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://spareparts-backend.vercel.app/api/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const results = await response.json();
        const categoryNames = results.map((category: { name: string }) => category.name);
        setData(['All', ...categoryNames]); // Prepend "All" to the categories
        console.log(['All', ...categoryNames]); // Debugging log
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchCategories();
  }, []);
  

  useEffect(() => {
    if (headerScrollView.current && data.length > 0) {
      headerScrollView.current.scrollToIndex({ index: active, viewPosition: 0.5 });
    }
  }, [active, data]); // Add `data` as a dependency
  

  const onPressHeader = (index: number) => {
    if (animationActiveRef) {
      clearTimeout(animationActiveRef);
    }
    if (data.length > 0 && active !== index) { // Ensure data is available
      animationActive = false;
      animationActiveRef = setTimeout(() => {
        animationActive = true;
      }, 400);
      if (itemScrollView.current) {
        itemScrollView.current.scrollToIndex({ index });
      }
      setActive(index);
    }
  };
  

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(x / width + 0.5);
    if (active !== newIndex && animationActive) {
      setActive(newIndex);
    }
  };

  const onMomentumScrollEnd = () => {
    animationActive = true;
  };
  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ref={headerScrollView}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        style={styles.headerScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <TouchableOpacity
              onPress={() => onPressHeader(index)}
              style={[styles.headerItem, { backgroundColor: active === index ? '#fff' : '#fff' }]}
            >
              <Text style={{ fontFamily: 'PoppinsRegular', color: active === index ? '#1F41BB' : '#000' }}>{item}</Text>
            </TouchableOpacity>
            {active === index && <View style={styles.headerBar} />}
          </View>
        )}
      />
      <FlatList
        data={data}
        ref={itemScrollView}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({ item, index }) => (
          <View style={styles.mainItem}>
            {item === 'All' ? (
              <AllProductsComponent />
            ) : (
              <CategoryProductsComponent category={item} />
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
  },
  headerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius:5,
    borderColor:'#1F41BB',
    fontFamily:'PoppinsRegular'
  },
  mainItem: {
    width: width,
    borderWidth: 5,
    borderColor: '#fff',
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headerBar: {
    height: 2,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
  },
});
