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
      console.log(state.cart);
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === productId
      );
      if (existingProductIndex !== -1) {
        const existingProduct = state.cart[existingProductIndex];
        if (existingProduct.quantity === 1) {
          state.cart.splice(existingProductIndex, 1);
        } else {
          existingProduct.quantity -= 1;
        }
      }
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
