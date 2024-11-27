import React, { useState } from 'react';
import { PaymentMethod } from '../types';
import { X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (paymentMethod: PaymentMethod) => void;
}

export function PaymentModal({ isOpen, onClose, onSubmit }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'mastercard' | 'visa' | 'cash'>('mastercard');
  const [formData, setFormData] = useState<PaymentMethod>({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Payment Method</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              className={`flex-1 p-4 border rounded-lg ${
                paymentMethod === 'mastercard' ? 'border-orange-500' : 'border-gray-200'
              }`}
              onClick={() => setPaymentMethod('mastercard')}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
            </button>
            <button
              className={`flex-1 p-4 border rounded-lg ${
                paymentMethod === 'visa' ? 'border-orange-500' : 'border-gray-200'
              }`}
              onClick={() => setPaymentMethod('visa')}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8" />
            </button>
            <button
              className={`flex-1 p-4 border rounded-lg ${
                paymentMethod === 'cash' ? 'border-orange-500' : 'border-gray-200'
              }`}
              onClick={() => setPaymentMethod('cash')}
            >
              Cash Payment
            </button>
          </div>

          {paymentMethod !== 'cash' && (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  value={formData.cardName}
                  onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  />
                </div>
              </div>
            </form>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(formData)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}