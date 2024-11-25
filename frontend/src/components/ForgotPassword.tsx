import React, { useState } from 'react';
import OTPVerification from './OTPVerification';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

export default function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone) {
      setError('Email or phone number is required');
      return;
    }
    setShowOTP(true);
  };

  if (showOTP) {
    return <OTPVerification onBackToLogin={onBackToLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side - Illustration and Text */}
          <div className="lg:w-1/2 space-y-8">
            <div className="flex items-center">
              <span className="text-[#FF5733] text-4xl font-bold">Dash</span>
              <span className="text-gray-900 text-4xl font-bold">Stack</span>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                alt="Reset Password"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 rounded-b-2xl">
                <h2 className="text-white text-2xl font-bold">
                  Reset Your Password
                </h2>
                <p className="text-gray-200">Secure and Simple.</p>
              </div>
            </div>
          </div>

          {/* Right side - Forgot Password Form */}
          <div className="lg:w-1/2 w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Forget Password
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your email and we'll send you a otp to reset your
                password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email or Phone*
                  </label>
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => {
                      setEmailOrPhone(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter Email or Phone number"
                    className={`mt-1 block w-full rounded-lg border ${
                      error ? 'border-red-500' : 'border-gray-300'
                    } px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]`}
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FF5733] to-[#ff4520] hover:from-[#ff4520] hover:to-[#FF5733] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5733]"
                >
                  Get OTP
                </button>

                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="w-full text-center text-sm text-[#FF5733] hover:text-[#ff4520]"
                >
                  Back to Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
