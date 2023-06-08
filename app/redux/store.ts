"use client";
import { configureStore } from "@reduxjs/toolkit";
import { Product } from "../models/Product";
import { ProductsState, productsSlice } from "./slices/products";
import { BrandssState, brandsSlice } from "./slices/brands";
import { cartSlice } from "./slices/cart";
import { ProductState, productSlice } from "./slices/product";

import storage from "./storage";

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

export interface AppStore {
  products: ProductsState;
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
    brands: brandsSlice.reducer,
    cart: persistedCartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
