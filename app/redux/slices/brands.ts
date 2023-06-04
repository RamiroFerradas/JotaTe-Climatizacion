import { Product } from "@/app/models/Product";
import { createSlice } from "@reduxjs/toolkit";

export interface BrandssState {
  allBrands: [];
}

const initialState: BrandssState = {
  allBrands: [],
};
export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    addBrands: (state, action) => {
      // console.log(action.payload)
      state.allBrands = action.payload;
    },
  },
});

export const { addBrands } = brandsSlice.actions;
export default brandsSlice.reducer;
