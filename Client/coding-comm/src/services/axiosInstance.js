import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://the-coding-community-production.up.railway.app/",
    headers: {
        Authorization: localStorage.getItem("token"),
    },
    withCredentials: true,
});

export default axiosInstance;