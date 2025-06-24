import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://restaurant-api.dicoding.dev",
  timeout: 10000,
});

export default axiosInstance;
