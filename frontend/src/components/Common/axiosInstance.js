// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://acd-backend.onrender.com', // Render'dan gelen backend URL
  withCredentials: true,
});

export default axiosInstance;
