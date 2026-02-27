import axios from "axios"

const productsApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/producto/"
})

export const getProducts = () => productsApi.get()