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

      if (categoryToFilter === "Todos") {
        state.filteredProducts = state.allProducts;
      } else {
        state.filteredProducts = state.allProducts.filter(
          (product) => product.category === categoryToFilter
        );
      }
    },
    orderByPrice: (state, action) => {
      const { type } = action.payload;
      if (type === "asc") {
        state.filteredProducts = [...state.filteredProducts].sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
      } else if (type === "desc") {
        state.filteredProducts = [...state.filteredProducts].sort(
          (a, b) => Number(b.price) - Number(a.price)
        );
      }
    },
    orderByConsults: (state, action) => {
      const { type } = action.payload;

      if (type === "asc") {
        state.filteredProducts = [...state.filteredProducts].sort(
          (a, b) => Number(b.consults) - Number(a.consults)
        );
      } else if (type === "desc") {
        state.filteredProducts = [...state.filteredProducts].sort(
          (a, b) => Number(a.consults) - Number(b.consults)
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
  orderByPrice,
  orderByConsults,
} = productsSlice.actions;
export default productsSlice.reducer;
