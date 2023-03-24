import axiosClient from './axiosClient';

export const categoryApi = {
  getCatagory() {
    return axiosClient.get('/category');
  },
  filterCategory(data) {
    return axiosClient.post('category/filter', data);
  }
};
