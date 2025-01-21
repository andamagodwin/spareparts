import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Adjust the path as per your store's file location

// Define the types for the cart items and state
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  totalPrice: number;
  product: {
    _id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

// Initial state
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (
      state,
      action: PayloadAction<{ product: CartItem; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice += product.price * quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
          totalPrice: product.price * quantity,
        });
      }

      state.totalQuantity += quantity;
      state.totalPrice += product.price * quantity;
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;

        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setInitialCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items.map((item) => ({
        id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image_url,
        quantity: item.quantity,
        totalPrice: item.product.price * item.quantity,
        product: item.product,
      }));

      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart, setInitialCart } =
  cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const cartSelector = (state: RootState) => state.cart;

export const cartItemsSelector = createSelector(
  cartSelector,
  (cart) => cart.items
);

export const cartTotalQuantitySelector = createSelector(
  cartSelector,
  (cart) => cart.totalQuantity
);

export const cartTotalPriceSelector = createSelector(
  cartSelector,
  (cart) => cart.totalPrice
);
