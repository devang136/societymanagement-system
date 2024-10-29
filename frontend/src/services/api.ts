import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const register = async (userData: any) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials: any) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const createSociety = async (societyData: any) => {
  const response = await api.post('/societies', societyData);
  return response.data;
};

export const getAllSocieties = async () => {
  const response = await api.get('/societies');
  return response.data;
};

export default api;