import axios from 'axios';
import { Visitor, VisitorFormData } from '../types/visitor';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:8001/api';

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
      toast.error('Failed to fetch visitors');
      throw error;
    }
  },

  async createVisitor(formData: VisitorFormData): Promise<Visitor> {
    try {
      const visitorData = {
        name: formData.name,
        phone: formData.phone,
        hostUnit: {
          building: formData.wing,
          number: formData.unit
        },
        status: 'checked_in',
        notes: formData.notes || ''
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
      const errorMessage = error.response?.data?.message || 'Failed to add visitor';
      toast.error(errorMessage);
      throw error;
    }
  }
}; 