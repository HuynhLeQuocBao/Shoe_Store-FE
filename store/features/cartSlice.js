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
  },
  reducers: {
    resetCart: (state, action) => {
      localStorage.removeItem("persist");
      state.products = [];
      state.total = 0;
      state.quantity = 0;
    },
    getDataFromCartApi: (state, action) => {
      const { cartItem, total } = action.payload;
      state.products.push({
        cartId: cartItem._id,
        productId: cartItem.productId,
        image: cartItem.image,
        name: cartItem.productName,
        price: parseInt(cartItem.productPrice),
        quantityProduct: cartItem.quantity,
        size: parseInt(cartItem.size),
        totalProduct: cartItem.total,
      });
      state.total = total;
      state.quantity = state.products.length;
    },
    addToCartStore: (state, action) => {
      const { product, cartItem } = action.payload;
      const index = state.products.findIndex(
        (p) => p.productId === product._id && p.size === size
      );
      if (index === -1) {
        state.products.push({
          cartId: cartItem._id,
          productId: product._id,
          image: product.arrayImage[0].filename,
          name: product.name,
          price: parseInt(product.price),
          quantityProduct: cartItem.quantity,
          size: parseInt(cartItem.size),
          totalProduct: cartItem.total,
        });
      } else {
        state.products[index].quantityProduct += cartItem.quantity;
      }
      state.total += cartItem.total;
      state.quantity = state.products.length;
    },
    increaseCartQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const index = state.products.findIndex(
        (p) => p.productId === productId && parseInt(p.size) === parseInt(size)
      );
      if (index !== -1) {
        state.products[index].quantityProduct += 1;
        state.products[index].totalProduct += state.products[index].price;
        state.total += state.products[index].price;
      }
    },
    decreaseCartQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const index = state.products.findIndex(
        (p) => p.productId === productId && p.size === size
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
} = cartSlice.actions;
export default cartSlice.reducer;
