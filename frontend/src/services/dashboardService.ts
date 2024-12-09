import axiosInstance from './axiosInstance';

export interface Complaint {
  id: number;
  name: string;
  complaintName: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Pending' | 'Solve';
  avatar: string;
}

export interface DashboardData {
  stats: {
    totalComplaints: number;
    resolvedComplaints: number;
    pendingPayments: number;
    totalResidents: number;
  };
  recentActivity: any[];
  notifications: any[];
  complaints: Complaint[];
}

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
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