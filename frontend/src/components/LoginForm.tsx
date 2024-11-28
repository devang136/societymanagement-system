import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '../services/authService';

interface LoginFormProps {
  onForgotPassword: () => void;
  onRegister: () => void;
  onLoginSuccess: (role: 'admin' | 'user' | 'security') => void;
}

interface LoginFormData {
  emailOrPhone: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm({
  onForgotPassword,
  onRegister,
  onLoginSuccess,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrPhone: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.emailOrPhone) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userData = await authService.login(formData.emailOrPhone, formData.password);
        if (userData.role === 'user') {
          onLoginSuccess('user');
        } else {
          setErrors({
            emailOrPhone: 'Invalid user credentials',
            password: 'Invalid user credentials',
          });
        }
      } catch (error) {
        setErrors({
          emailOrPhone: 'Invalid credentials',
          password: 'Invalid credentials',
        });
      }
    }
  };


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
                alt="Society Management"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 rounded-b-2xl">
                <h2 className="text-white text-2xl font-bold">
                  Your Space, Your Place:{' '}
                  <span className="text-[#FF5733]">Society Management</span>
                </h2>
                <p className="text-gray-200">Made Simple.</p>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="lg:w-1/2 w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Login</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email or Phone*
                  </label>
                  <input
                    type="text"
                    name="emailOrPhone"
                    value={formData.emailOrPhone}
                    onChange={handleInputChange}
                    placeholder="Enter Your Phone Number or Email"
                    className={`mt-1 block w-full rounded-lg border ${
                      errors.emailOrPhone ? 'border-red-500' : 'border-gray-300'
                    } px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]`}
                  />
                  {errors.emailOrPhone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.emailOrPhone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password*
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter Password"
                      className={`block w-full rounded-lg border ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      } px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember-me"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#FF5733] focus:ring-[#FF5733] border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm text-[#FF5733] hover:text-[#ff4520]"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FF5733] to-[#ff4520] hover:from-[#ff4520] hover:to-[#FF5733] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5733]"
                >
                  Sign in
                </button>

                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={onRegister}
                    className="text-[#FF5733] hover:text-[#ff4520] font-medium"
                  >
                    Registration
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}