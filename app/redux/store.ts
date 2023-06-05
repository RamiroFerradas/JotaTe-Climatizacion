"use client";
import { configureStore } from "@reduxjs/toolkit";
import { Product } from "../models/Product";
import { ProductsState, productsSlice } from "./slices/products";
import { favoritesSlice } from "./slices/favorites";
import { BrandssState, brandsSlice } from "./slices/brands";
import { cartSlice } from "./slices/cart";
import { ProductState, productSlice } from "./slices/product";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

export interface AppStore {
  products: ProductsState;
  favorites: Product[];
  brands: BrandssState;
  cart: any;
  product: ProductState;
}

const persistConfig = {
  key: "cart",
  storage,
  version: 1,
};

const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    product: productSlice.reducer,
    favorites: favoritesSlice.reducer,
    brands: brandsSlice.reducer,
    cart: persistedCartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
