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

export interface ComplaintData {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  wing: string;
  unit: string;
}

export const complaintService = {
  async createComplaint(complaintData: ComplaintData) {
    try {
      console.log('Creating complaint:', complaintData);
      const response = await axios.post(
        `${API_URL}/complaints/create`, 
        complaintData,
        { headers: getAuthHeaders() }
      );
      console.log('Complaint created:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Create complaint error:', error);
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
      console.error('Get complaints error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch complaints');
    }
  }
}; 