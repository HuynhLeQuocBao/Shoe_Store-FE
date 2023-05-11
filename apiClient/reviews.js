import axiosClient from "./axiosClient";

export const reviewsApi = {
  commentAndRate(id, data) {
    return axiosClient.post(`/customer/commentAndRate/${id}`, data);
  },
  editComment(id, data) {
    return axiosClient.put(`/customer/editComment/${id}`, data);
  },
  getRate(id) {
    return axiosClient.get(`/customer/getRate/${id}`);
  },
};
