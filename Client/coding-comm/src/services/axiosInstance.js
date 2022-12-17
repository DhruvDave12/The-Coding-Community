import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        Authorization: localStorage.getItem("token"),
    },
    withCredentials: true,
});

export default axiosInstance;