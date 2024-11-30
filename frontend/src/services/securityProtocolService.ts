import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:8001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const securityProtocolService = {
  async getProtocols() {
    try {
      const response = await axios.get(`${API_URL}/security-protocols/all`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error: any) {
      console.error('Get protocols error:', error.response?.data || error);
      if (error.response?.status === 401) {
        toast.error('Please log in again');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch protocols');
    }
  }
}; 