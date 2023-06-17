import { Product } from "@/app/models";
import { createSlice } from "@reduxjs/toolkit";

export interface ProductState {
  selectedProduct: Product;
  openModal: boolean;
}

const initialProduct = {};

const initialState: ProductState = {
  selectedProduct: initialProduct as Product,
  openModal: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = initialProduct as Product;
    },
    openProductDetails: (state) => {
      state.openModal = true;
    },
    closeProductDetails: (state) => {
      state.openModal = false;
      state.selectedProduct = initialProduct as Product;
    },
  },
});

export const {
  selectProduct,
  clearSelectedProduct,
  openProductDetails,
  closeProductDetails,
} = productSlice.actions;

export default productSlice.reducer;
