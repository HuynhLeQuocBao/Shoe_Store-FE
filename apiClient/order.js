import axiosClient from './axiosClient';

export const orderApi = {
    getAllOrder() {
        return axiosClient.get('/customer/myOrder');
    },
    getOrderDetail(id) {
        return axiosClient.get(`/customer/myOrderDetail/${id}`);
    },
    confirmOrder(id) {
        return axiosClient.post(`/customer/confirmDelivered/${id}`);
    },
    deleteOrder(id) {
        return axiosClient.delete(`/customer/cancelOrder/${id}`);
    }
};