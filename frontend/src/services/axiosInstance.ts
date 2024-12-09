import axios, { AxiosError } from 'axios';

// Custom config type to include retryCount
interface CustomAxiosConfig {
  retryCount?: number;
}
const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8001/api' 
    : 'https://societymanagement-system.onrender.com/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for authentication
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for retrying requests and handling authentication
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Handle 401 unauthorized errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Retry logic
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second
    
    const config = error.config as CustomAxiosConfig;
    
    if (!config || !error.config) {
      return Promise.reject(error);
    }

    if (config.retryCount === undefined) {
      config.retryCount = 0;
    }

    if (
      config.retryCount < maxRetries &&
      (error.code === 'ECONNABORTED' || error.response?.status === 408)
    ) {
      config.retryCount += 1;
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      return axiosInstance(error.config);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
