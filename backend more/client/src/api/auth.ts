import axios from "axios";

const API_URL = "http://localhost:3000/api";

export type RegisterData = {
    username: string;
    email: string;
    password: string;
};

export type LoginData = { email: string; password: string };

export const registerRequest = (user: RegisterData) =>
    axios.post(`${API_URL}/register`, user);

export const loginRequest = (user: LoginData) =>
    axios.post(`${API_URL}/login`, user);