import React, { useState, useRef, useEffect } from 'react';

interface OTPVerificationProps {
  onBackToLogin: () => void;
}

export default function OTPVerification({
  onBackToLogin,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((digit) => !digit)) {
      setError('Please enter all digits');
      return;
    }
    console.log('OTP submitted:', otp.join(''));
  };

  const handleResend = () => {
    setTimeLeft(30);
    setOtp(['', '', '', '', '', '']);
    setError('');
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
                alt="OTP Verification"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 rounded-b-2xl">
                <h2 className="text-white text-2xl font-bold">
                  Verify Your Identity
                </h2>
                <p className="text-gray-200">
                  Enter the OTP sent to your device.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - OTP Form */}
          <div className="lg:w-1/2 w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Enter OTP
              </h2>
              <p className="text-gray-600 mb-8">
                Please enter the 6 digit code that sent to your phone number.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-2 justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-12 h-12 text-center text-xl font-semibold rounded-lg border ${
                        error ? 'border-red-500' : 'border-gray-300'
                      } focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]`}
                      maxLength={1}
                    />
                  ))}
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-500">
                      {timeLeft > 0 ? `${timeLeft} sec` : ''}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={timeLeft > 0}
                    className={`text-[#FF5733] hover:text-[#ff4520] ${
                      timeLeft > 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Resend OTP
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FF5733] to-[#ff4520] hover:from-[#ff4520] hover:to-[#FF5733] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5733]"
                >
                  Verify
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
