import { Product } from "@/app/models/Product";
import { createSlice } from "@reduxjs/toolkit";

export interface ProductsState {
  allProducts: Product[];
  filteredProducts: Product[];
}

const initialState: ProductsState = {
  allProducts: [],
  filteredProducts: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.allProducts = action.payload;
      state.filteredProducts = action.payload;
    },
    filterProductsByBrand: (state, action) => {
      const brandsToFilter = action.payload;
      if (brandsToFilter.length === 0) {
        state.filteredProducts = state.allProducts;
      } else {
        state.filteredProducts = state.allProducts.filter((product) =>
          brandsToFilter.includes(product.brand)
        );
      }
    },
  },
});

export const { addProducts, filterProductsByBrand } = productsSlice.actions;
export default productsSlice.reducer;
