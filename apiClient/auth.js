import axiosClient from "./axiosClient";

export const authApi = {
	registerUser(data) {
		return axiosClient.post("auth/register", data);
	},
	verifyToken(data) {
		return axiosClient.post("auth/verifyToken", data);
	},
	refreshToken(data) {
		return axiosClient.post("auth/refreshToken", data);
	},
};
