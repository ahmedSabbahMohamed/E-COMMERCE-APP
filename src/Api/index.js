import axios from "axios";
import { store } from "../redux/store";
import { toast } from "react-toastify";

const BASE_API = `https://mo7amedatef17.serv00.net/api`;

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : null;
};

const getHeaders = () => {
  const token = getToken();
  if (token) {
    return {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    };
  } else {
    return {
      "Content-Type": "multipart/form-data",
    };
  }
};

const handleUploadProgress = (e) => {
  const progress = Math.round((e.loaded * 100) / e.total);
  if (toast.isActive("upload_progress")) {
    toast.update("upload_progress", {
      render: `Upload Progress: ${progress}%`,
      autoClose: false,
    });
  } else {
    toast.info(`Upload Progress: ${progress}%`, {
      toastId: "upload_progress",
      autoClose: false,
    });
  }
  if (progress === 100) {
    toast.update("upload_progress", {
      render: "Upload Complete",
      type: toast.success,
      autoClose: 5000,
    });
  }
  console.log(progress);
};

const containsFiles = (formData) => {
  for (let value of formData.values()) {
    if (value instanceof File) {
      return true;
    }
  }
  return false;
};

export const API = axios.create({
  baseURL: BASE_API,
  headers: getHeaders(),
});

API.interceptors.request.use((config) => {
  if (config.data instanceof FormData && containsFiles(config.data)) {
    config.onUploadProgress = handleUploadProgress;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      store.dispatch({ type: "API_CALL_FAILURE", payload: error.response });
    }
    return Promise.reject(error);
  }
);
