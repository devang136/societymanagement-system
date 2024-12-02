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

export interface DashboardData {
  complaints: Array<{
    id: string;
    name: string;
    complaintName: string;
    date: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Open' | 'Pending' | 'Solve';
    description: string;
    wing: string;
    unit: string;
    avatar: string;
  }>;
  stats: {
    totalComplaints: number;
    pendingComplaints: number;
    solvedComplaints: number;
  };
}

export const dashboardService = {
  async getDashboardData() {
    try {
      const response = await axios.get<DashboardData>(
        `${API_URL}/dashboard/data`,
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error('Get dashboard data error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
  }
}; 