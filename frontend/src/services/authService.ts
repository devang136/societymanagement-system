import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  country: string;
  state: string;
  city: string;
  society: string;
  wing: string;
  unit: string;
}

export const authService = {
  async register(formData: Omit<RegisterData, 'confirmPassword'>) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, formData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  },

  async login(credentials: { emailOrPhone: string; password: string }) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        emailOrPhone: credentials.emailOrPhone.toLowerCase(),
        password: credentials.password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('user');
  },

  async getSocieties() {
    try {
      const response = await axios.get(`${API_URL}/auth/societies/list`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};