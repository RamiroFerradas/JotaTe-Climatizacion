import { Product } from "@/app/models/Product";
import { LocalStorageTypes } from "@/app/models/localstorage";
import {
  getLocalStorage,
  setLocalStorage,
} from "@/app/utilities/localstorage.utility";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState: Product[] = [];

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      setLocalStorage(LocalStorageTypes.FAVORITES, action.payload);
      return action.payload;
    },
    removeFavorite: (state, action) => {
      const filteredState = current(state).filter(
        (p: Product) => p.id !== action.payload.id
      );
      setLocalStorage(LocalStorageTypes.FAVORITES, filteredState);
      return filteredState;
    },
  },
});
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
