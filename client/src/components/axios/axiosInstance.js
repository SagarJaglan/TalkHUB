import axios from "axios";

const BASE_URL = import.meta.env.VITE_DB_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 🔑 sends cookies along with every request
  headers: {
    "Content-Type": "application/json",
  },
});

