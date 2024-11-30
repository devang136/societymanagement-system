import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

interface UserData {
  role: 'admin' | 'user' | 'security';
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    society: string;
    wing: string;
    unit: string;
  };
}

export const authService = {
  async login(email: string, password: string): Promise<UserData> {
    try {
      console.log('Attempting login with:', { email, password });
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { token, user } = response.data;
      
      // Store auth data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return {
        role: user.role as 'admin' | 'user' | 'security',
        token,
        user
      };
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};