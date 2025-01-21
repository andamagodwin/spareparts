import { createAsyncThunk } from '@reduxjs/toolkit';
import { setInitialCart } from '../slices/cartSlice';
import { CartState } from '../slices/cartSlice';
import { RootState } from '../store';

// Define the type for the response data
interface FetchCartResponse extends CartState {}

// Fetch initial cart thunk
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, thunkAPI) => {
    try {
      // Get the token from the Redux state
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('Authorization token is missing');
      }

      // Make the API request
      const response = await fetch(`https://spareparts-backend.vercel.app/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data: FetchCartResponse = await response.json();
      thunkAPI.dispatch(setInitialCart(data)); // Dispatch action to set cart state
      return data;
    } catch (error: any) {
      console.error('Error fetching cart:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);




export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (
    { productId, quantity }: { productId: string; quantity: number },
    thunkAPI
  ) => {
    try {
      // Get the token from the Redux state
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('Authorization token is missing');
      }

      // Make the POST request to add the item to the cart
      const response = await fetch(`https://spareparts-backend.vercel.app/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');

      }

      const updatedCart: FetchCartResponse = await response.json();
      console.log(updatedCart)

      // Dispatch action to update the cart state
      thunkAPI.dispatch(setInitialCart(updatedCart));
      return updatedCart;
    } catch (error: any) {
      console.error('Error adding item to cart:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async (
    { productId, quantity }: { productId: string; quantity: number },
    thunkAPI
  ) => {
    try {
      // Get the token from the Redux state
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('Authorization token is missing');
      }

      // Make the PUT request to update the cart item
      const response = await fetch(
        `https://spareparts-backend.vercel.app/api/cart/update/${productId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
          body: JSON.stringify({ quantity }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update cart item');
      }

      const updatedCart: FetchCartResponse = await response.json();
      console.log(updatedCart);

      // Dispatch action to update the cart state
      thunkAPI.dispatch(setInitialCart(updatedCart));
      return updatedCart;
    } catch (error: any) {
      console.error('Error updating cart item:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({ productId }:{productId:string}, thunkAPI) => {
    try {
      // Get the token from the Redux state
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('Authorization token is missing');
      }

      // Make the DELETE request to remove the cart item
      const response = await fetch(
        `https://spareparts-backend.vercel.app/api/cart/remove/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove cart item');
      }

      const updatedCart: FetchCartResponse = await response.json();
      console.log(updatedCart);

      // Dispatch action to update the cart state
      thunkAPI.dispatch(setInitialCart(updatedCart));
      return updatedCart;
    } catch (error: any) {
      console.error('Error removing cart item:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

