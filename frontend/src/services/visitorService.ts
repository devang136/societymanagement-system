import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

interface Visitor {
  id: string;
  name: string;
  phone: string;
  purpose: string;
  flatNumber: string;
  inTime: string;
  outTime?: string;
  status: 'IN' | 'OUT';
}

interface VisitorFormData {
  name: string;
  phone: string;
  purpose: string;
  flatNumber: string;
}

const API_URL = 'https://societymanagement-system.onrender.com';

export const visitorService = {
  async getAllVisitors(): Promise<Visitor[]> {
    try {
      const response = await axios.get(`${API_URL}/visitors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error('Failed to fetch visitors');
      throw axiosError;
    }
  },

  async createVisitor(formData: VisitorFormData): Promise<Visitor> {
    try {
      const response = await axios.post(
        `${API_URL}/visitors`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('Visitor added successfully');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Failed to add visitor';
      toast.error(errorMessage);
      throw axiosError;
    }
  }
}; 