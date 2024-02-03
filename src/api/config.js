import axios from "axios";

const orangeAPI = axios.create({
    baseURL: "https://orange-api.onrender.com",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },
});

export default orangeAPI;