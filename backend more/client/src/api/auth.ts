import axios from "./axios";

export type RegisterData = {
    username: string;
    email: string;
    password: string;
};

export type LoginData = { email: string; password: string };

export const registerRequest = (user: RegisterData) =>
    axios.post(`/register`, user);

export const loginRequest = (user: LoginData) =>
    axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get(`/verify`);