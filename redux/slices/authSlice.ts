import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
  



interface AuthState {
  user: User | null;
  token: string | null;
  email: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  email: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string; email: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      AsyncStorage.setItem('userData', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.email = null;
      state.isLoggedIn = false;
      AsyncStorage.removeItem('userData');
    },
    loadUserFromStorage: (state, action: PayloadAction<AuthState>) => {
      if (action.payload) {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.isLoggedIn = action.payload.isLoggedIn;
      }
    },
  },
});

export const { setUser, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
