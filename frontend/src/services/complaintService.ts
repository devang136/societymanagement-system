import axios from 'axios';
import { Complaint } from '../components/usersidelogic/servicecomplaint/types';

const API_URL = 'http://localhost:8000/api/complaints';

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const complaintService = {
  async getComplaints(): Promise<Complaint[]> {
    try {
      const response = await axios.get<(Complaint & { _id: string })[]>(API_URL);
      return response.data.map(complaint => ({
        ...complaint,
        id: complaint._id
      }));
    } catch (error: any) {
      console.error('Error fetching complaints:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch complaints');
    }
  },

  async createComplaint(complaintData: Omit<Complaint, 'id' | '_id'>): Promise<Complaint> {
    try {
      const formattedData = {
        ...complaintData,
        status: 'Open',
        requestDate: new Date().toISOString().split('T')[0]
      };
      const response = await axios.post<Complaint & { _id: string }>(`${API_URL}/add`, formattedData);
      return {
        ...response.data,
        id: response.data._id
      };
    } catch (error: any) {
      console.error('Error creating complaint:', error);
      throw new Error(error.response?.data?.message || 'Failed to create complaint');
    }
  },

  async deleteComplaint(id: string): Promise<void> {
    try {
      if (!id) {
        throw new Error('Invalid complaint ID');
      }
      await axios.delete(`${API_URL}/${id}`);
    } catch (error: any) {
      console.error('Error deleting complaint:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete complaint');
    }
  }
}; 