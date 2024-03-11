import axios from "axios"

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

export const API = axios.create({
    baseURL: BASE_API,
    headers: getHeaders()
})