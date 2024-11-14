import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: 0,
  },
  reducers: {
    cartProductsCount(state, action) {
      state.count = action.payload;
    },
  },
});

export const { cartProductsCount } = cartSlice.actions;
export default cartSlice.reducer;
