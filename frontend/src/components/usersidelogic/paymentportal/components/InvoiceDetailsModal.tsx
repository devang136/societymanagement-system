import { X } from 'lucide-react';
import type { Invoice } from '../types';
import { invoiceService } from '../../../../services/invoiceService';
import { toast } from 'react-hot-toast';

interface InvoiceDetailsModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoiceDetailsModal({ invoice, isOpen, onClose }: InvoiceDetailsModalProps) {
  if (!isOpen || !invoice) return null;

  const handleDownload = async () => {
    try {
      console.log('Invoice data before download:', invoice);
      if (!invoice.invoiceId) {
        toast.error('Invalid invoice data');
        return;
      }

      // Create the invoice first
      await invoiceService.createInvoice({
        invoiceId: invoice.invoiceId,
        maintenanceAmount: invoice.maintenanceAmount,
        penaltyAmount: invoice.pendingAmount,
        billDate: new Date(invoice.billDate),
        ownerName: invoice.ownerName,
        email: invoice.email,
        phoneNumber: invoice.phoneNumber,
        description: `Maintenance invoice for ${invoice.ownerName}`
      });

      // Then download it
      await invoiceService.downloadInvoice(invoice.invoiceId);
      toast.success('Invoice downloaded successfully');
    } catch (error: any) {
      console.error('Download error:', error);
      // If the error is just that the invoice already exists, proceed with download
      if (error.message?.includes('already exists')) {
        try {
          await invoiceService.downloadInvoice(invoice.invoiceId);
          toast.success('Invoice downloaded successfully');
          return;
        } catch (downloadError) {
          console.error('Download error after invoice exists:', downloadError);
          toast.error('Failed to download existing invoice');
        }
      } else {
        toast.error(error.message || 'Failed to download invoice');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Maintenance Invoices</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Invoice ID</p>
            <p className="font-medium">{invoice.invoiceId}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Owner Name</p>
            <p className="font-medium">{invoice.ownerName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Bill Date</p>
              <p className="font-medium">{invoice.billDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Date</p>
              <p className="font-medium">{invoice.paymentDate}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium">{invoice.phoneNumber}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{invoice.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{invoice.address}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-500">Maintenance Amount</p>
              <p className="font-medium text-green-600">₹ {invoice.maintenanceAmount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Penalty</p>
              <p className="font-medium text-red-600">₹ {invoice.pendingAmount}</p>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-sm text-gray-500">Grand Total</p>
            <p className="font-medium">₹ {invoice.maintenanceAmount + invoice.pendingAmount}</p>
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-500">Note</p>
            <p className="text-sm">A visual representation of your spending categories visual representation.</p>
          </div>

          <button 
            onClick={handleDownload}
            className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
}