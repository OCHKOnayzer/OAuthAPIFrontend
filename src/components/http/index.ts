import axios from "axios";

export const AUTH_API_URL = `http://localhost:8080/api/userRouter`;

export const apiAuth = axios.create({
    withCredentials:true,
    baseURL: AUTH_API_URL
})

apiAuth.interceptors.request.use(config=> { 
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config
})
