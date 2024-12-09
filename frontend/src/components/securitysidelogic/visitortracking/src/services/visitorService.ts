import axios, { AxiosError } from 'axios';
import { Visitor, VisitorFormData } from '../types/visitor';
import { toast } from 'react-hot-toast';

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
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      
      const visitorData = {
        name: formData.name,
        phone: formData.phone,
        hostUnit: {
          building: formData.wing,
          number: formData.unit
        },
        status: 'checked_in',
        notes: formData.notes || '',
        date: date,
        entryTime: time,
        purpose: 'General Visit'
      };

      const response = await axios.post(
        `${API_URL}/visitors`,
        visitorData,
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