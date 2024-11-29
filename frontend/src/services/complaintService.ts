import axios from 'axios';
import { Complaint, Status } from '../components/usersidelogic/servicecomplaint/types';

const API_URL = 'http://localhost:8000/api/complaints';

axios.interceptors.request.use(request => {
  console.log('Request:', request);
  return request;
});

export const complaintService = {
  async getComplaints(): Promise<Complaint[]> {
    try {
      const response = await axios.get<Complaint[]>(API_URL);
      console.log('Fetched complaints:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching complaints:', error.response?.data);
      throw error;
    }
  },

  async createComplaint(complaintData: Omit<Complaint, 'id'>): Promise<Complaint> {
    try {
      const formattedData = {
        ...complaintData,
        status: 'Open' as Status,
        requestDate: new Date().toISOString().split('T')[0]
      };
      console.log('Sending complaint data:', formattedData);
      const response = await axios.post<Complaint>(`${API_URL}/add`, formattedData);
      console.log('Created complaint:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating complaint:', error.response?.data);
      throw error;
    }
  },

  async deleteComplaint(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
      console.log('Deleted complaint:', id);
    } catch (error: any) {
      console.error('Error deleting complaint:', error.response?.data);
      throw error;
    }
  }
}; 