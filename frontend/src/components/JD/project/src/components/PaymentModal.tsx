import React, { useState } from 'react';
import { CreditCard, X } from 'lucide-react';

type PaymentMethod = 'mastercard' | 'visa' | 'cash';

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

export const PaymentModal = ({ isOpen, onClose, onSubmit }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mastercard');
  const [cardDetails, setCardDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Payment Method</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <div
            className={`flex items-center p-3 border rounded-lg cursor-pointer ${
              paymentMethod === 'mastercard' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
            }`}
            onClick={() => setPaymentMethod('mastercard')}
          >
            <input
              type="radio"
              checked={paymentMethod === 'mastercard'}
              className="w-4 h-4 text-orange-500"
              readOnly
            />
            <span className="ml-3 text-sm text-gray-700">Master Card</span>
          </div>

          <div
            className={`flex items-center p-3 border rounded-lg cursor-pointer ${
              paymentMethod === 'visa' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
            }`}
            onClick={() => setPaymentMethod('visa')}
          >
            <input
              type="radio"
              checked={paymentMethod === 'visa'}
              className="w-4 h-4 text-orange-500"
              readOnly
            />
            <span className="ml-3 text-sm text-gray-700">Visa Card</span>
          </div>

          <div
            className={`flex items-center p-3 border rounded-lg cursor-pointer ${
              paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
            }`}
            onClick={() => setPaymentMethod('cash')}
          >
            <input
              type="radio"
              checked={paymentMethod === 'cash'}
              className="w-4 h-4 text-orange-500"
              readOnly
            />
            <span className="ml-3 text-sm text-gray-700">Cash Payment</span>
          </div>
        </div>

        {(paymentMethod === 'mastercard' || paymentMethod === 'visa') && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Card Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter card holder name"
                value={cardDetails.cardName}
                onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                />
                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Expiry Date</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">CVV</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit({ paymentMethod, cardDetails })}
            className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}