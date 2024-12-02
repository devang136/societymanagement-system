import React, { useState, useEffect } from 'react';
import { PaymentCard } from './components/PaymentCard';
import { PaymentModal } from './components/PaymentModal';
import { InvoiceModal } from './components/InvoiceModal';
import { invoiceService } from '../../../services/invoiceService';
import { toast } from 'react-hot-toast';

interface Event {
  _id: string;
  eventName: string;
  eventDate: string;
  amount: number;
  status: 'pending' | 'paid';
}

interface Invoice {
  _id: string;
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
}

// Dummy data
const dummyEvents: Event[] = [
  {
    _id: '1',
    eventName: 'Navratri Festival',
    eventDate: '2024-01-11',
    amount: 1000,
    status: 'pending'
  },
  {
    _id: '2',
    eventName: 'Diwali Celebration',
    eventDate: '2024-02-15',
    amount: 1500,
    status: 'pending'
  },
  {
    _id: '3',
    eventName: 'Holi Festival',
    eventDate: '2024-03-20',
    amount: 800,
    status: 'pending'
  },
  {
    _id: '4',
    eventName: 'New Year Party',
    eventDate: '2024-12-31',
    amount: 2000,
    status: 'pending'
  }
];

const dummyInvoice: Invoice = {
  _id: '1',
  invoiceId: '125465',
  ownerName: 'Terry Rhiel Madsen',
  billDate: '2024-02-10',
  paymentDate: '2024-02-10',
  phoneNumber: '6549873521',
  email: 'MaryKhurst@journade.com',
  eventName: 'Ganesh Chaturthi',
  description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Lord Ganesa in Durkesideni.',
  maintenanceAmount: 1500.00,
  grandTotal: 1850.00
};

export function OtherIncomeInvoicesApp() {
  const [events, setEvents] = useState<Event[]>(dummyEvents);
  const [invoice, setInvoice] = useState<Invoice>(dummyInvoice);
  const [loading, setLoading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
    fetchInvoice();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await invoiceService.getEvents();
      // If no data from API, use dummy data
      setEvents(data.length > 0 ? data : dummyEvents);
    } catch (error: any) {
      console.error('Fetch events error:', error);
      toast.error(error.message);
      // Fallback to dummy data on error
      setEvents(dummyEvents);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoice = async () => {
    try {
      const data = await invoiceService.getLatestInvoice();
      // If no data from API, use dummy invoice
      setInvoice(data || dummyInvoice);
    } catch (error: any) {
      console.error('Fetch invoice error:', error);
      // Fallback to dummy invoice on error
      setInvoice(dummyInvoice);
    }
  };

  const handleDownloadInvoice = async () => {
    try {
      if (invoice) {
        await invoiceService.downloadInvoice(invoice._id);
        toast.success('Invoice downloaded successfully');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handlePayNow = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSubmit = (paymentData: any) => {
    console.log('Payment submitted:', paymentData);
    setIsPaymentModalOpen(false);
    toast.success('Payment processed successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold text-gray-800">Due Event Payment</h1>
          <button
            onClick={() => setIsInvoiceModalOpen(true)}
            className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors"
          >
            View Invoice
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <PaymentCard
              key={event._id}
              eventName={event.eventName}
              eventDate={new Date(event.eventDate).toLocaleDateString()}
              amount={event.amount}
              onPayNow={() => handlePayNow(event._id)}
            />
          ))}
        </div>

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onSubmit={handlePaymentSubmit}
        />

        <InvoiceModal
          isOpen={isInvoiceModalOpen}
          onClose={() => setIsInvoiceModalOpen(false)}
          invoiceData={invoice}
          onDownload={handleDownloadInvoice}
        />
      </div>
    </div>
  );
}

export default OtherIncomeInvoicesApp;