import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = 'https://societymanagement-system.onrender.com';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    toast.error('Authentication required');
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
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Failed to fetch personal details';
      toast.error(errorMessage);
      throw axiosError;
    }
  }
}; 