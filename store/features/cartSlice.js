import { cartApi } from "@/apiClient/cartAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCartList = createAsyncThunk(
  "customer/cart",
  async ({}, { rejectWithValue }) => {
    try {
      const data = await cartApi.getAllCart();
      return data?.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
    quantity: 0,
  },
  reducers: {
    addToCartStore: (state, action) => {
      const { product, quantity, size } = action.payload;
      const index = state.products.findIndex(
        (p) => p._id === product._id && p.size === size
      );
      if (index === -1) {
        state.products.push({
          ...product,
          quantity,
          size,
        });
      } else {
        state.products[index].quantity += quantity;
      }
      state.total += product.price * quantity;
      state.quantity = state.products.length;
    },
  },
});

export const { addToCartStore } = cartSlice.actions;
export default cartSlice.reducer;
