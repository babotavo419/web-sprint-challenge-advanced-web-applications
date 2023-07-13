import axios from 'axios';

const axiosWithAuth = axios.create({
  baseURL: 'http://localhost:9000/api',
});

axiosWithAuth.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosWithAuth;


