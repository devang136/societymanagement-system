import axios from 'axios';
import axiosInstance from './axiosInstance';

interface LoginCredentials {
  email?: string;
  password: string;
  emailOrPhone: string;
}

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  society: string;
  wing: string;
  unit: string;
  password: string;
}
axios
export const authService = {
 // frontend/src/services/authService.ts - Update the login method
login: async (credentials: LoginCredentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Connection timeout - please try again');
      }
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw error;
  }
},


  register: async (data: RegistrationData) => {
    try {
      const response = await axiosInstance.post('/auth/register', data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getSocieties: async () => {
    try {
      const response = await axiosInstance.get('/auth/societies');
      return response.data;
    } catch (error) {
      console.error('Error fetching societies:', error);
      throw error;
    }
  }
};