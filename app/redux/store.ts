import { configureStore } from "@reduxjs/toolkit";

import { Product } from "../models/Product";
import { ProductsState, productsSlice } from "./slices/products";
import { favoritesSlice } from "./slices/favorites";
import { BrandssState, brandsSlice } from "./slices/brands";
import { CartState, cartSlice } from "./slices/cart";

export interface AppStore {
  products: ProductsState;
  favorites: Product[];
  brands: BrandssState;
  cart: CartState;
}

export default configureStore<AppStore>({
  reducer: {
    products: productsSlice.reducer,
    favorites: favoritesSlice.reducer,
    brands: brandsSlice.reducer,
    cart: cartSlice.reducer,
  },
});
