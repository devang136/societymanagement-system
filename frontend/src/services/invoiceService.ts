import axiosInstance from './axiosInstance';

interface CreateInvoiceData {
  invoiceId: string;
  maintenanceAmount: number;
  penaltyAmount?: number;
  eventId?: string;
  billDate?: Date;
  ownerName: string;
  email: string;
  phoneNumber: string;
  eventName?: string;
  description?: string;
}

export const invoiceService = {
  async createInvoice(data: CreateInvoiceData) {
    try {
      console.log('Creating invoice with data:', data);
      const response = await axiosInstance.post('/invoices/create', data);
      
      // Check if invoice already exists
      if (response.data.message === 'Invoice already exists') {
        console.log('Invoice already exists, proceeding with download');
        return response.data;
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Create invoice error:', error);
      throw new Error(error.response?.data?.message || 'Failed to create invoice');
    }
  },

  async downloadInvoice(invoiceId: string) {
    try {
      console.log('Initiating invoice download for ID:', invoiceId);
      
      const response = await axiosInstance.get(`/invoices/download/${invoiceId}`, {
        responseType: 'blob'
      });
      
      // Check if response is an error message
      if (response.headers['content-type']?.includes('application/json')) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const error = JSON.parse(reader.result as string);
            throw new Error(error.message || 'Failed to generate PDF');
          } catch (e) {
            throw new Error('Invalid response from server');
          }
        };
        reader.readAsText(response.data);
        return;
      }
      
      // Check if response is a PDF
      if (!response.headers['content-type']?.includes('application/pdf')) {
        throw new Error('Invalid response type from server');
      }
      
      // Create file download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `invoice-${invoiceId}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
      
      console.log('Invoice download completed successfully');
    } catch (error: any) {
      console.error('Invoice download error:', error);
      if (error.response) {
        console.error('Error response:', {
          status: error.response.status,
          data: error.response.data
        });
      }
      throw new Error(error.response?.data?.message || 'Failed to download invoice');
    }
  }
}; 