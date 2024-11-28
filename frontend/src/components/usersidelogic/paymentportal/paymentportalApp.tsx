import React, { useState } from 'react';
import { Header } from './components/Header';
import { MaintenanceCard } from './components/MaintenanceCard';
import { InvoiceTable } from './components/InvoiceTable';
import { PaymentModal } from './components/PaymentModal';
import { InvoiceDetailsModal } from './components/InvoiceDetailsModal';
import { MaintenanceHeader } from './components/MaintenanceHeader';
import type { Invoice, MaintenanceCard as MaintenanceCardType, PaymentMethod } from './types';

const MOCK_USER = {
  name: 'Moni Roy',
  role: 'Admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const MOCK_MAINTENANCE_CARDS: MaintenanceCardType[] = [
  {
    billDate: '11/01/2024',
    pendingDate: '11/01/2024',
    maintenanceAmount: 1000.00,
    penaltyAmount: 250.00,
    total: 1250.00,
  },
  {
    billDate: '11/01/2024',
    pendingDate: '11/01/2024',
    maintenanceAmount: 1000.00,
    penaltyAmount: 250.00,
    total: 1250.00,
  },
  {
    billDate: '11/01/2024',
    pendingDate: '11/01/2024',
    maintenanceAmount: 1000.00,
    penaltyAmount: 250.00,
    total: 1250.00,
  },
];

const MOCK_DUE_CARDS: MaintenanceCardType[] = [
  {
    billDate: '11/01/2024',
    pendingDate: '11/01/2024',
    maintenanceAmount: 1000.00,
    penaltyAmount: 250.00,
    total: 1250.00,
  },
  {
    billDate: '11/01/2024',
    pendingDate: '11/01/2024',
    maintenanceAmount: 1000.00,
    penaltyAmount: 250.00,
    total: 1250.00,
  },
];

const MOCK_INVOICES: Invoice[] = [
  {
    invoiceId: '152563',
    ownerName: 'Terry Rhiel Madsen',
    billDate: '10/02/2024',
    paymentDate: '10/02/2024',
    phoneNumber: '9764816457',
    email: 'FrancesLHarris@rhyta.com',
    maintenanceAmount: 1500,
    pendingAmount: 2500,
    address: '2115 Thornridge Cir. Syracuse, Connecticut 35624',
  },
  {
    invoiceId: '152563',
    ownerName: 'Marcus Vaccaro',
    billDate: '10/02/2024',
    paymentDate: '10/02/2024',
    phoneNumber: '9601765987',
    email: 'DavidBSMey@daysvep.com',
    maintenanceAmount: 1500,
    pendingAmount: 6500,
    address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
  },
];

export function PaymentPortalApp() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [showInvoices, setShowInvoices] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handlePayNow = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSubmit = (paymentMethod: PaymentMethod) => {
    console.log('Payment submitted:', paymentMethod);
    setIsPaymentModalOpen(false);
  };

  const handleViewInvoice = () => {
    setShowInvoices(true);
  };

  const handleBack = () => {
    setShowInvoices(false);
  };

  const handleInvoiceDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  return (
    <div className="flex-1">
      <Header user={MOCK_USER} />
      <main className="p-6">
        {!showInvoices ? (
          <>
            <MaintenanceHeader onViewInvoice={handleViewInvoice} />
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Pending Maintenance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_MAINTENANCE_CARDS.map((card, index) => (
                  <MaintenanceCard
                    key={index}
                    data={card}
                    status="pending"
                    onPayNow={handlePayNow}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Due Maintenance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_DUE_CARDS.map((card, index) => (
                  <MaintenanceCard
                    key={index}
                    data={card}
                    status="due"
                    onPayNow={handlePayNow}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back
                </button>
                <h3 className="text-xl font-semibold">Maintenance Invoices</h3>
              </div>
              <select className="border rounded-lg px-3 py-2">
                <option>Month</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
              </select>
            </div>
            <InvoiceTable
              invoices={MOCK_INVOICES}
              onViewInvoice={handleInvoiceDetails}
            />
          </div>
        )}
      </main>
      
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSubmit={handlePaymentSubmit}
      />

      <InvoiceDetailsModal
        invoice={selectedInvoice}
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
}

export default PaymentPortalApp;