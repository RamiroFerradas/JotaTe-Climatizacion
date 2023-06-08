import { Product } from "@/app/models";
import { createSlice } from "@reduxjs/toolkit";

export interface ProductState {
  selectedProduct: Product;
  openModal: boolean;
}

const initialProduct: Product = {
  id: "",
  name: "",
  image: [],
  description: "",
  price: "",
  brand: "",
};

const initialState: ProductState = {
  selectedProduct: initialProduct,
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
      state.selectedProduct = initialProduct;
    },
    openProductDetails: (state) => {
      state.openModal = true;
    },
    closeProductDetails: (state) => {
      state.openModal = false;
      state.selectedProduct = initialProduct;
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
