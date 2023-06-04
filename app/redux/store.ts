import { configureStore } from "@reduxjs/toolkit";

import { Product } from "../models/Product";
import { ProductsState, productsSlice } from "./slices/products";
import { favoritesSlice } from "./slices/favorites";
import { BrandssState, brandsSlice } from "./slices/brands";

export interface AppStore {
  products: ProductsState;
  favorites: Product[];
  brands: BrandssState;
}

export default configureStore<AppStore>({
  reducer: {
    products: productsSlice.reducer,
    favorites: favoritesSlice.reducer,
    brands: brandsSlice.reducer,
  },
});
