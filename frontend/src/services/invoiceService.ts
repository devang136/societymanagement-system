import axios from 'axios';

export const invoiceService = {
  async downloadInvoice(invoiceId: string) {
    try {
      const response = await axios.get(`/api/invoices/download/${invoiceId}`, {
        responseType: 'blob'
      });
      
      // Create file download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `invoice-${invoiceId}.pdf`; // This will force download instead of opening
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error: any) {
      console.error('Download error:', error);
      throw new Error(error.response?.data?.message || 'Failed to download invoice');
    }
  }
}; 