import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: { items: [] },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
  },
  removeFromCart: (state, action) => {
    state.items = state.items.filter((_, i) => i !== action.payload);
  },
  clearCart: (state) => {
    state.items = [];
  }
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;