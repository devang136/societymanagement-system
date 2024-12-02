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

export const invoiceService = {
  async getEvents() {
    try {
      const response = await axios.get(`${API_URL}/invoices/events`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error: any) {
      console.error('Get events error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch events');
    }
  },

  async getLatestInvoice() {
    try {
      const response = await axios.get(`${API_URL}/invoices/latest`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error: any) {
      console.error('Get invoice error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch invoice');
    }
  },

  async downloadInvoice(invoiceId: string) {
    try {
      const response = await axios.get(`${API_URL}/invoices/download/${invoiceId}`, {
        headers: {
          ...getAuthHeaders(),
          Accept: 'application/pdf'
        },
        responseType: 'blob'
      });

      // Create blob link to download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${invoiceId}.pdf`);

      // Append to html page
      document.body.appendChild(link);

      // Force download
      link.click();

      // Clean up and remove the link
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error: any) {
      console.error('Download invoice error:', error);
      throw new Error(error.response?.data?.message || 'Failed to download invoice');
    }
  }
}; 