import axiosInstance from './axiosInstance';

export interface SecurityProtocol {
  _id: string;
  title: string;
  description: string;
  category: 'Emergency' | 'Daily' | 'Visitor' | 'Maintenance' | 'Other';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Under Review' | 'Archived';
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  society: string;
  createdAt: string;
  updatedAt: string;
}

export const securityProtocolService = {
  getProtocols: async () => {
    try {
      console.log('Fetching security protocols...');
      const response = await axiosInstance.get('/security-protocols');
      console.log('Protocols fetched:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Get protocols error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to fetch protocols');
    }
  },

  createProtocol: async (protocolData: Omit<SecurityProtocol, '_id' | 'createdBy' | 'society' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await axiosInstance.post('/security-protocols/create', protocolData);
      return response.data;
    } catch (error: any) {
      console.error('Create protocol error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to create protocol');
    }
  },

  updateProtocol: async (id: string, updates: Partial<SecurityProtocol>) => {
    try {
      const response = await axiosInstance.put(`/security-protocols/${id}`, updates);
      return response.data;
    } catch (error: any) {
      console.error('Update protocol error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to update protocol');
    }
  },

  deleteProtocol: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/security-protocols/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Delete protocol error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to delete protocol');
    }
  }
}; 