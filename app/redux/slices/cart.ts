import { Product } from "@/app/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  open: boolean;
}

const initialState: CartState = {
  cart: [],
  open: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      state.cart = state.cart.filter(
        (product) => product.id !== productIdToRemove
      );
    },
    decrementQuantityCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingProduct = state.cart.find((item) => item.id === productId);
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },

    openCart: (state, action) => {
      return {
        ...state,
        open: action.payload,
      };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decrementQuantityCart,
  openCart,
} = cartSlice.actions;

export default cartSlice.reducer;
