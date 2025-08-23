import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL  || "http://localhost:5000/api";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
})

//Request Interceptor (Attach Token)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance