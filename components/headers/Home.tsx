import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'react-native';
import CategorySection from '../CategorySection';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

function HomeHeader() {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleOptionPress = (option: string) => {
    setPopupVisible(false);
    if (option === 'logout') {
      Alert.alert('Logged out');
    } else if (option === 'settings') {
      Alert.alert('Navigate to Settings');
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topHeader}>
        <View>
          <Image
            src="https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
        </View>
        <View style={styles.rightHeader}>
          <View style={styles.notifications}>
            <FontAwesome name="circle" size={10} color="red" />
            <Octicons name="bell" size={24} color="black" />
          </View>
          <TouchableOpacity onPress={() => setPopupVisible(!popupVisible)}>
            <View style={styles.kebab}>
              <Octicons name="kebab-horizontal" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.categoriesContainer}>
        <Text>Categories</Text>
        <CategorySection />
      </View>

      {/* Popup Menu */}
      {popupVisible && (
        <View style={styles.popupMenu}>
          <TouchableOpacity
            style={styles.popupOption}
            onPress={() => handleOptionPress('settings')}
          >
            <Ionicons name="settings-outline" size={20} color="#333" />
            <Text style={styles.popupText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.popupOption}
            onPress={() => handleOptionPress('logout')}
          >
            <Ionicons name="log-out-outline" size={20} color="#333" />
            <Text style={styles.popupText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kebab: {
    transform: [{ rotate: '90deg' }],
  },
  notifications: {},
  rightHeader: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
  },
  popupMenu: {
    position: 'absolute',
    top: 70, // Adjust based on your kebab icon's position
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    zIndex: 10,
  },
  popupOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  popupText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default HomeHeader;
