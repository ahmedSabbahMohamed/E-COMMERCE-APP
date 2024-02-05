import axios from "axios"

const BASE_API = `https://1ed6-154-183-32-217.ngrok-free.app`;

export const API = axios.create({
    baseURL: BASE_API,
})