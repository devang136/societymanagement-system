import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:8001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }
  return {
    'Authorization': `Bearer ${token}`
  };
};

export const invoiceService = {
  async downloadInvoice(invoiceId: string) {
    try {
      if (!invoiceId) {
        throw new Error('Invoice ID is required');
      }

      console.log('Downloading invoice:', invoiceId); // Debug log

      const response = await axios({
        url: `${API_URL}/invoices/download/${invoiceId}`,
        method: 'GET',
        responseType: 'blob',
        headers: {
          ...getAuthHeaders(),
          'Accept': 'application/pdf'
        }
      });

      // Create blob link to download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${invoiceId}.pdf`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error: any) {
      console.error('Download invoice error:', error);
      
      // Handle blob error response
      if (error.response?.data instanceof Blob) {
        const text = await error.response.data.text();
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData.message || 'Failed to download invoice');
        } catch {
          throw new Error('Failed to download invoice');
        }
      }
      
      throw new Error(error.response?.data?.message || 'Failed to download invoice');
    }
  }
}; 