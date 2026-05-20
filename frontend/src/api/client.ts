import axios from "axios";
import { authExpiredEvent } from "../utils/authEvents";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("smartleads-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("smartleads-token");
      window.dispatchEvent(new Event(authExpiredEvent));
    }

    return Promise.reject(error);
  }
);

export default apiClient;
