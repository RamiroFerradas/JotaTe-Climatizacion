import { Product } from "@/app/models/Product";
import { createSlice } from "@reduxjs/toolkit";

export interface BrandsState {
  allBrands: string[];
  brandsFiltered: string[];
}

const initialState: BrandsState = {
  allBrands: [],
  brandsFiltered: [],
};
export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    addBrands: (state, action) => {
      state.allBrands = action.payload;
    },
    addBrandsFiltered: (state, action) => {
      state.brandsFiltered = action.payload;
    },
  },
});

export const { addBrands, addBrandsFiltered } = brandsSlice.actions;
export default brandsSlice.reducer;
