import React, { useState } from 'react';
import { PaymentCard } from './components/PaymentCard';
import { PaymentModal } from './components/PaymentModal';
import { InvoiceModal } from './components/InvoiceModal';

const mockEvents = [
  { id: 1, eventName: 'Navratri', eventDate: '11/01/2024', amount: 1000 },
  { id: 2, eventName: 'Navratri', eventDate: '11/01/2024', amount: 1000 },
  { id: 3, eventName: 'Navratri', eventDate: '11/01/2024', amount: 1000 },
  { id: 4, eventName: 'Navratri', eventDate: '11/01/2024', amount: 1000 },
];

const mockInvoiceData = {
  invoiceId: '125465',
  ownerName: 'Terry Rhiel Madsen',
  billDate: '10/02/2024',
  paymentDate: '10/02/2024',
  phoneNumber: '6549873521',
  email: 'MaryKhurst@journade.com',
  eventName: 'Ganesh Chaturthi',
  description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Lord Ganesa in Durkesideni.',
  maintenanceAmount: 1500.00,
  grandTotal: 1850.00,
};

export function OtherIncomeInvoicesApp() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handlePayNow = (eventId: number) => {
    setSelectedEventId(eventId);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSubmit = (paymentData: any) => {
    console.log('Payment submitted:', paymentData);
    setIsPaymentModalOpen(false);
  };

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
          {mockEvents.map((event) => (
            <PaymentCard
              key={event.id}
              eventName={event.eventName}
              eventDate={event.eventDate}
              amount={event.amount}
              onPayNow={() => handlePayNow(event.id)}
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
          invoiceData={mockInvoiceData}
        />
      </div>
    </div>
  );
}

export default OtherIncomeInvoicesApp;