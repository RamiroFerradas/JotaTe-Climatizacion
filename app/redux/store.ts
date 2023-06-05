"use client";
import { configureStore } from "@reduxjs/toolkit";
import { Product } from "../models/Product";
import { ProductsState, productsSlice } from "./slices/products";
import { favoritesSlice } from "./slices/favorites";
import { BrandssState, brandsSlice } from "./slices/brands";
import { CartState, cartSlice } from "./slices/cart";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

export interface AppStore {
  products: ProductsState;
  favorites: Product[];
  brands: BrandssState;
  cart: any;
}

const persistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    favorites: favoritesSlice.reducer,
    brands: brandsSlice.reducer,
    cart: persistedCartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  // middleware: [thunk],
});

export const persistor = persistStore(store);
