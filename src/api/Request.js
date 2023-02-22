import axios from "axios";
import { BASE_URL } from "./apiEndPoints";

export const RequestAPi = axios.create({
  baseURL: BASE_URL,
  timeout: 40000,
  headers: {
    "Content-type": "application/json",
    withCredentials: true,
  },
});

RequestAPi.interceptors.request.use(
  (config) => {
    let token2 = localStorage.getItem("token");
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Basic ${token2}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
RequestAPi.interceptors.response.use(
  function (response) {

    return response;
  },
  async (error) => {
    if (error?.response?.status === 403) {
    }
    return Promise.reject(error);
  }
);
