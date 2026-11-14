import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true, // This allows sending cookies with requests
}); 

export default instance;