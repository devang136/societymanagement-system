import { X, Download } from 'lucide-react';
import { invoiceService } from '../../../../services/invoiceService';
import { toast } from 'react-hot-toast';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceData: {
    invoiceId: string;
    ownerName: string;
    billDate: string;
    paymentDate: string;
    phoneNumber: string;
    email: string;
    eventName: string;
    description: string;
    maintenanceAmount: number;
    grandTotal: number;
  };
}

export const InvoiceModal = ({ isOpen, onClose, invoiceData }: InvoiceModalProps) => {
  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      console.log('Creating invoice with data:', invoiceData);
      
      // Create the invoice first with all required data
      await invoiceService.createInvoice({
        invoiceId: invoiceData.invoiceId,
        maintenanceAmount: invoiceData.maintenanceAmount,
        penaltyAmount: invoiceData.grandTotal - invoiceData.maintenanceAmount,
        billDate: new Date(invoiceData.billDate),
        ownerName: invoiceData.ownerName,
        email: invoiceData.email,
        phoneNumber: invoiceData.phoneNumber,
        eventName: invoiceData.eventName,
        description: invoiceData.description
      });

      // If invoice exists or was created successfully, proceed with download
      console.log('Downloading invoice with ID:', invoiceData.invoiceId);
      await invoiceService.downloadInvoice(invoiceData.invoiceId);
      toast.success('Invoice downloaded successfully');
    } catch (error: any) {
      console.error('Download error:', error);
      toast.error(error.message || 'Failed to download invoice');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Event Invoices List</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Invoice Id</span>
            <span className="text-sm text-gray-700">{invoiceData.invoiceId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Owner Name</span>
            <span className="text-sm text-gray-700">{invoiceData.ownerName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Bill Date</span>
            <span className="text-sm text-gray-700">{invoiceData.billDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Payment Date</span>
            <span className="text-sm text-gray-700">{invoiceData.paymentDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Phone Number</span>
            <span className="text-sm text-gray-700">{invoiceData.phoneNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm text-blue-600">{invoiceData.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Event Name</span>
            <span className="text-sm text-gray-700">{invoiceData.eventName}</span>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 mb-2">Description</p>
            <p className="text-sm text-gray-600">{invoiceData.description}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Maintenance Amount</span>
            <span className="text-sm text-gray-700">₹ {invoiceData.maintenanceAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center font-medium">
            <span className="text-sm">Grand Total</span>
            <span className="text-sm">₹ {invoiceData.grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Invoice
        </button>
      </div>
    </div>
  );
}