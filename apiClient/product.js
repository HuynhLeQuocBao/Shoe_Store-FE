import axiosClient from "./axiosClient";

export const productApi = {
  getAllProducts() {
    return axiosClient.get("/shoes/displayAllProducts");
  },
  getProductById(id) {
    return axiosClient.get(`/shoes/${id}`);
  },
  searchProducts(search) {
    return axiosClient.get(`/shoes/displayAllProducts?search=${search}`);
  },
};
