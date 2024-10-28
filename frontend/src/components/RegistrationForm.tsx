import React, { useState } from 'react';
import { Eye, EyeOff, Building2 } from 'lucide-react';
import CreateSocietyModal from './CreateSocietyModal';

interface RegistrationFormProps {
  onBackToLogin: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  society: string;
  password: string;
  confirmPassword: string;
}

export default function RegistrationForm({ onBackToLogin }: RegistrationFormProps) {
  // ... (keep all existing state and handlers)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* ... (keep existing JSX until the last paragraph) */}
      
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-[#FF5733] hover:text-[#ff4520] font-medium"
        >
          Login
        </button>
      </p>

      {showModal && <CreateSocietyModal onClose={() => setShowModal(false)} />}
    </div>
  );
}