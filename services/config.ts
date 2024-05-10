import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const authClient = axios.create({
	baseURL: BASE_URL,
});

export const client = axios.create({
	baseURL: BASE_URL,
});

export const handleError = (e: any) => {
	if (e?.response?.data?.message) {
		if (e?.response?.data?.message === "jwt expired") {
			window.location.pathname = "/login";
		} else {
			alert(e.response?.data?.message);
		}
	} else {
		alert("Xatolik yuz berdi\nIltimos keyinroq urunib ko'ring");
	}
};

// TO TAKE EVERYTIME UP TO DATE ACCESS_TOKEN
client.interceptors.request.use(
	(config) => {
		const token = sessionStorage.getItem("token") || "";

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
