import axios from "axios"

const BASE_API = `https://6ab3-154-183-49-223.ngrok-free.app`;

export const API = axios.create({
    baseURL: BASE_API,
})