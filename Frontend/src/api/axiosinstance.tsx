import axios from "axios";

const axiosInstance = axios.create({
    // baseURL : window.location.origin,
    // baseURL : "http://13.229.160.22:9000",s
    // baseURL : 'https://oauth.kinkorn.pongpich.xyz'
    baseURL : process.env.BASE_URL 
});

export default axiosInstance;