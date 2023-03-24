import axios from "axios";
import { getSession } from "next-auth/react";

const axiosClient = axios.create({
	baseURL: "/api/v1/",
	timeout: 30000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

axiosClient.interceptors.request.use(
	async (config) => {
		const session = await getSession();

		if (session) {
			config.headers.Authorization = `Bearer ${session.accessToken}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosClient.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosClient;
