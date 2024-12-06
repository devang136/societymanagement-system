import axiosInstance from './axiosInstance';

export const dashboardService = {
  getDashboardData: async () => {
    try {
      const response = await axiosInstance.get('/dashboard/data');
      return response.data;
    } catch (error) {
      console.error('Get dashboard data error:', error);
      throw new Error('Please authenticate');
    }
  },
  // ... other methods
}; 