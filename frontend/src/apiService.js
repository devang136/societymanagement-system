import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Your backend URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor for JWT token
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiService;