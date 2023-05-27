import { cartApi } from "@/apiClient/cartAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      const results = await cartApi.getAllCart();
      return results;
    } catch (error) {
      return thunkAPI.rejectWithValue("error");
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
    quantity: 0,
    isLoading: false,
  },
  reducers: {
    resetCart: (state, action) => {
      localStorage.removeItem("persist:root");
      state.products = [];
      state.total = 0;
      state.quantity = 0;
      state.isLoading = false;
    },
    updateTotalCart: (state, action) => {
      const { total } = action.payload;
      state.total = total;
    },
    addToCartStore: (state, action) => {
      const { product, cartItem } = action.payload;
      const index = state.products.findIndex(
        (p) => p.productId === product._id && p.size === cartItem.sizeName
      );
      if (index === -1) {
        state.products.push({
          cartId: cartItem._id,
          productId: product._id,
          colorId: cartItem.colorId,
          image: product.image,
          name: product.name,
          price: parseFloat(product.price),
          quantityProduct: cartItem.quantity,
          size: cartItem.sizeName,
          sizeId: cartItem.sizeId,
          totalProduct: cartItem.total,
        });
      } else {
        state.products[index].quantityProduct += cartItem.quantity;
      }
      state.total += cartItem.total;
      state.quantity = state.products.length;
    },
    increaseCartQuantity: (state, action) => {
      const { productId, sizeId } = action.payload;
      const index = state.products.findIndex(
        (p) => p.productId === productId && p.sizeId === sizeId
      );
      if (index !== -1) {
        state.products[index].quantityProduct += 1;
        state.products[index].totalProduct += state.products[index].price;
        state.total += state.products[index].price;
      }
    },
    decreaseCartQuantity: (state, action) => {
      const { productId, sizeId } = action.payload;
      const index = state.products.findIndex(
        (p) => p.productId === productId && p.sizeId === sizeId
      );
      if (index !== -1 && state.products[index].quantityProduct > 1) {
        state.products[index].quantityProduct -= 1;
        state.products[index].totalProduct -= state.products[index].price;
        state.total -= state.products[index].price;
      }
    },
    deleteProductFormCart: (state, action) => {
      const { cartId } = action.payload;
      const index = state.products.findIndex((p) => p.cartId === cartId);
      state.total -= state.products[index].totalProduct;
      state.quantity -= 1;
      state.products.splice(index, 1);
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state, action) => {
      // state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      if (action.payload.message === "Cart empty") {
        localStorage.removeItem("persist:root");
        state.products = [];
        state.total = 0;
        state.quantity = 0;
        state.isLoading = false;
      } else if (action.payload.results.length > 0) {
        localStorage.removeItem("persist:root");
        state.products = [];
        state.total = 0;
        state.quantity = 0;
        state.isLoading = false;
        action.payload.results.map((item) =>
          state.products.push({
            cartId: item?._id,
            productId: item?.productId,
            colorId: item?.colorId,
            image: item?.image,
            name: item?.productName,
            price: parseFloat(item?.productPrice),
            quantityProduct: item?.quantity,
            size: item?.sizeName,
            sizeId: item?.sizeId,
            totalProduct: item?.total,
          })
        );
        state.total = action.payload.totalCart;
        state.quantity = state.products?.length;
        state.isLoading = false;
      }
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  addToCartStore,
  increaseCartQuantity,
  decreaseCartQuantity,
  getDataFromCartApi,
  deleteProductFormCart,
  resetCart,
  updateTotalCart,
} = cartSlice.actions;
export default cartSlice.reducer;
