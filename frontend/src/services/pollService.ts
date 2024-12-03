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

export const pollService = {
  async createPoll(pollData: any) {
    try {
      console.log('Creating poll with data:', pollData);
      const response = await axios.post(`${API_URL}/polls/create`, pollData, {
        headers: getAuthHeaders()
      });
      console.log('Poll created:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Create poll error:', error.response?.data || error);
      if (error.response?.status === 401) {
        toast.error('Please log in again');
        // Optionally redirect to login
      }
      throw new Error(error.response?.data?.message || 'Failed to create poll');
    }
  },

  async getPolls() {
    try {
      console.log('Fetching polls...');
      const response = await axios.get(`${API_URL}/polls/all`, {
        headers: getAuthHeaders()
      });
      console.log('Polls fetched:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Get polls error:', error.response?.data || error);
      if (error.response?.status === 401) {
        toast.error('Please log in again');
        // Optionally redirect to login
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch polls');
    }
  },

  async votePoll(pollId: string, optionIndex: number) {
    try {
      const response = await axios.post(
        `${API_URL}/polls/${pollId}/vote`, 
        { optionIndex },
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error('Vote poll error:', error.response?.data || error);
      if (error.response?.status === 401) {
        toast.error('Please log in again');
      }
      throw new Error(error.response?.data?.message || 'Failed to vote on poll');
    }
  },

  async getUserPolls() {
    try {
      const response = await axios.get(`${API_URL}/polls/user-polls`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error: any) {
      console.error('Get user polls error:', error.response?.data || error);
      if (error.response?.status === 401) {
        toast.error('Please log in again');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch user polls');
    }
  }
}; 