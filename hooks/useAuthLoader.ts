import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          dispatch(loadUserFromStorage(userData));
        }
      } catch (error) {
        console.error('Failed to load user data from storage:', error);
      }
    };

    loadUserData();
  }, [dispatch]);
};

export default useAuthLoader;
