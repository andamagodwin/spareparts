import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width / 5) * 2;
const gap = (width - itemWidth) / 11;

interface TileScrollingProps {
  items: React.ReactNode[];
}

const TileScrolling: React.FC<TileScrollingProps> = ({ items }) => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      decelerationRate="fast"
      contentContainerStyle={styles.scrollView}
      showsHorizontalScrollIndicator={false}
      snapToInterval={itemWidth + gap}>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          {item}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: gap,
    paddingRight: gap,
    alignItems: 'center',
  },
  item: {
    height: itemWidth,
    width: itemWidth,
    marginRight: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default TileScrolling;
