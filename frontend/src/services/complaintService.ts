import axiosInstance from './axiosInstance';

export interface ComplaintData {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  category?: string;
  wing: string;
  unit: string;
}

export interface Complaint extends ComplaintData {
  _id: string;
  status: 'Open' | 'Pending' | 'Solved';
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const complaintService = {
  createComplaint: async (complaintData: ComplaintData) => {
    try {
      console.log('Sending complaint data:', complaintData);
      
      const response = await axiosInstance.post('/complaints/create', complaintData);
      
      console.log('Server response:', response.data);
      
      return response.data;
    } catch (error: any) {
      console.error('Create complaint error:', error);
      throw new Error(error.response?.data?.message || 'Failed to create complaint');
    }
  },

  getComplaints: async () => {
    try {
      const response = await axiosInstance.get('/complaints/all');
      return response.data;
    } catch (error) {
      console.error('Get complaints error:', error);
      throw new Error('Please authenticate');
    }
  },

  updateComplaint: async (id: string, updates: Partial<ComplaintData>) => {
    try {
      const response = await axiosInstance.put(`/complaints/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Update complaint error:', error);
      throw error;
    }
  },

  deleteComplaint: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/complaints/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete complaint error:', error);
      throw error;
    }
  }
}; 