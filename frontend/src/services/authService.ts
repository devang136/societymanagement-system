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

export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
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