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

export interface PersonalDetails {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  gender: string;
  wing: string;
  age: number;
  unit: string;
  relation: string;
  members: Array<{
    name: string;
    email: string;
    phoneNumber: string;
    age: number;
    gender: string;
    relation: string;
  }>;
  vehicles: Array<{
    type: string;
    vehicleName: string;
    vehicleNumber: string;
  }>;
  maintenanceAmount: number;
  penaltyAmount: number;
}

export const personalDetailsService = {
  async getPersonalDetails() {
    try {
      const response = await axios.get<PersonalDetails>(
        `${API_URL}/personal/details`,
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error('Get personal details error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch personal details');
    }
  }
}; 