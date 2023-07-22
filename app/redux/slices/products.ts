import { Product } from "@/app/models/Product";
import { createSlice } from "@reduxjs/toolkit";

export interface ProductsState {
  allProducts: Product[];
  filteredProducts: Product[];
  filteredProductsByCategory: Product[];
  categoryActive: string;
  subCategoryActive: string;
  searchPerformed: boolean;
}

const initialState: ProductsState = {
  allProducts: [],
  filteredProducts: [],
  filteredProductsByCategory: [],
  categoryActive: "Todos",
  subCategoryActive: "",
  searchPerformed: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.allProducts = action.payload;
      state.filteredProducts = action.payload;
    },
    searchProducts: (state, action) => {
      state.categoryActive = "Todos";
      state.searchPerformed = true;
      const searchTerm = action.payload.toLowerCase();
      state.filteredProducts = state.allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm)
      );
    },
    filterProductsByBrand: (state, action) => {
      const brandsToFilter = action.payload;
      const isAllCategories = state.categoryActive === "Todos";

      state.filteredProducts = state.allProducts.filter((product) => {
        const brandMatches =
          brandsToFilter.length === 0 || brandsToFilter.includes(product.brand);
        const categoryMatches =
          isAllCategories ||
          product.subcategory.includes(state.subCategoryActive);
        return brandMatches && categoryMatches;
      });
    },

    filterProductsByCategory: (state, action) => {
      const categoryToFilter = action.payload;
      if (categoryToFilter) {
        if (categoryToFilter === "Todos") {
          state.filteredProducts = state.allProducts;
        } else {
          state.filteredProducts = state.allProducts.filter(
            (product) => product.category === categoryToFilter
          );
        }
      }
    },
    filterProductsBySubCategory: (state, action) => {
      const subcategoryToFilter = action.payload;
      state.subCategoryActive = subcategoryToFilter;
      console.log(subcategoryToFilter);
      if (subcategoryToFilter) {
        if (subcategoryToFilter === "Todos") {
          state.filteredProducts = state.allProducts;
        } else {
          state.filteredProducts = state.allProducts.filter(
            (product) =>
              subcategoryToFilter.toLowerCase() ===
              product.subcategory.toLowerCase()
          );
        }
      }
    },

    orderByPrice: (state, action) => {
      const { type } = action.payload;
      if (type === "asc") {
        state.filteredProducts = [...state.filteredProducts]
          .filter((product) =>
            product.subcategory.includes(state.subCategoryActive)
          )
          .sort((a, b) => Number(a.price) - Number(b.price));
      } else if (type === "desc") {
        state.filteredProducts = [...state.filteredProducts]
          .filter((product) =>
            product.subcategory.includes(state.subCategoryActive)
          )
          .sort((a, b) => Number(b.price) - Number(a.price));
      }
    },

    orderByConsults: (state, action) => {
      const { type } = action.payload;
      if (type === "asc") {
        state.filteredProducts = [...state.filteredProducts]
          .filter((product) =>
            product.subcategory.includes(state.subCategoryActive)
          )
          .sort((a, b) => Number(b.consults) - Number(a.consults));
      } else if (type === "desc") {
        state.filteredProducts = [...state.filteredProducts]
          .filter((product) =>
            product.subcategory.includes(state.subCategoryActive)
          )
          .sort((a, b) => Number(a.consults) - Number(b.consults));
      }
    },
    selectCategory: (state, action) => {
      state.categoryActive = action.payload;
    },
    selectSubCategory: (state, action) => {
      state.subCategoryActive = action.payload;
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
  filterProductsBySubCategory,
  selectCategory,
  selectSubCategory,
} = productsSlice.actions;
export default productsSlice.reducer;
