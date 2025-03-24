// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000', // backend portunu buraya yaz
  withCredentials: true,
});

export default axiosInstance;
