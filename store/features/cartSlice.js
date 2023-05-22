import { cartApi } from "@/apiClient/cartAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async ({ productId }, { dispatch, rejectWithValue }) => {
    try {
      // Gọi API để cập nhật số lượng sản phẩm tăng lên 1
      const updatedCart = await cartApi.updateCart(productId);
      // Thực hiện cập nhật số lượng sản phẩm trong store
      dispatch(updateCart(updatedCart));
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
    isLoading: true,
    isCheckout: false,
  },
  reducers: {
    resetCart: (state, action) => {
      localStorage.removeItem("persist:root");
      state.products = [];
      state.total = 0;
      state.quantity = 0;
      state.isLoading = true;
      state.isCheckout = false;
    },
    checkout: (state, action) => {
      state.isCheckout = true;
    },
    updateTotalCart: (state, action) => {
      const { total } = action.payload;
      state.total = total;
    },
    getDataFromCartApi: (state, action) => {
      const { cartItem, total } = action.payload;
      if (cartItem) {
        state.products.push({
          cartId: cartItem?._id,
          productId: cartItem?.productId,
          colorId: cartItem?.colorId,
          image: cartItem?.image,
          name: cartItem?.productName,
          price: parseFloat(cartItem?.productPrice),
          quantityProduct: cartItem?.quantity,
          size: cartItem?.sizeName,
          sizeId: cartItem?.sizeId,
          totalProduct: cartItem?.total,
        });
      }
      state.total = total;
      state.quantity = state.products?.length;
      state.isLoading = false;
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
