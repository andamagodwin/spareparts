import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import loadingReducer from './slices/loadingSlice';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    auth: authReducer,
  },
});

// Infer types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
