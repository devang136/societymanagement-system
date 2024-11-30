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

export const complaintService = {
  async createComplaint(complaintData: any) {
    try {
      console.log('Creating complaint:', complaintData);
      const response = await axios.post(`${API_URL}/complaints/create`, complaintData, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error: any) {
      console.error('Create complaint error:', error.response?.data || error);
      if (error.response?.status === 401) {
        toast.error('Please log in again');
      }
      throw new Error(error.response?.data?.message || 'Failed to create complaint');
    }
  },

  async getComplaints() {
    try {
      const response = await axios.get(`${API_URL}/complaints/all`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error: any) {
      console.error('Get complaints error:', error.response?.data || error);
      if (error.response?.status === 401) {
        toast.error('Please log in again');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch complaints');
    }
  },

  async updateComplaint(id: string, updates: any) {
    try {
      const response = await axios.put(`${API_URL}/complaints/${id}`, updates, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error: any) {
      console.error('Update complaint error:', error.response?.data || error);
      if (error.response?.status === 401) {
        toast.error('Please log in again');
      }
      throw new Error(error.response?.data?.message || 'Failed to update complaint');
    }
  },

  async deleteComplaint(id: string) {
    try {
      const response = await axios.delete(`${API_URL}/complaints/${id}`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error: any) {
      console.error('Delete complaint error:', error.response?.data || error);
      if (error.response?.status === 401) {
        toast.error('Please log in again');
      }
      throw new Error(error.response?.data?.message || 'Failed to delete complaint');
    }
  }
}; 