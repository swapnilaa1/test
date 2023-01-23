import axios from "axios";
import { BASE_URL } from "./apiEndPoints";

export const RequestAPi = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    "Content-type": "application/json",
    withCredentials: true,
  },
});

RequestAPi.interceptors.request.use(
  (config) => {
    let token2 = localStorage.getItem("token");
    // console.log("token 2 in config", token2);
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Basic ${token2}`;
    }
    // console.log("in config", config);
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
RequestAPi.interceptors.response.use(
  function (response) {
    // console.log("in response ", response);
    // Object.assign(response, { list: response.data });

    return response;
  },
  async (error) => {
    if (error?.response?.status === 403) {
      //console.log("in response interceptors due to error");
    }
    //console.log("error in response", error.config);
    return Promise.reject(error);
  }
);
