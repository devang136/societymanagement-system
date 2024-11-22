import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ResetPasswordProps {
  onBackToLogin: () => void;
}

interface PasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPassword({ onBackToLogin }: ResetPasswordProps) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<PasswordFormData>({
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword === formData.confirmPassword) {
      console.log('Password reset:', formData);
      onBackToLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side - Logo and Illustration */}
          <div className="lg:w-1/2 space-y-8">
            <div className="flex items-center">
              <span className="text-[#FF5733] text-4xl font-bold">Dash</span>
              <span className="text-gray-900 text-4xl font-bold">Stack</span>
            </div>

            <div className="relative">
              <img
                src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/reset-password.png"
                alt="Reset Password"
                className="w-full"
              />
            </div>
          </div>

          {/* Right side - Reset Password Form */}
          <div className="lg:w-1/2 w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Reset Password
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password*
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter New Password"
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password*
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Enter Confirm Password"
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FF5733] to-[#ff4520] hover:from-[#ff4520] hover:to-[#FF5733] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5733]"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}