import axiosClient from "./axiosClient";

export const voucherApi = {
  getAllVouchers() {
    return axiosClient.get("/customer/promotion");
  },
  applyVoucher(data) {
    return axiosClient.put("/customer/applyPromo", data);
  },
};
