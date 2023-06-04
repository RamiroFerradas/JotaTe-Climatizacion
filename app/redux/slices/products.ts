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
    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredProducts = state.allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm)
      );
    },
    filterProductsByCategory: (state, action) => {
      const categoryToFilter = action.payload;
      console.log(categoryToFilter);
      if (categoryToFilter === "Todos") {
        state.filteredProducts = state.allProducts;
      } else {
        state.filteredProducts = state.allProducts.filter(
          (product) => product.category === categoryToFilter
        );
      }
    },
  },
});

export const {
  addProducts,
  filterProductsByBrand,
  searchProducts,
  filterProductsByCategory,
} = productsSlice.actions;
export default productsSlice.reducer;
