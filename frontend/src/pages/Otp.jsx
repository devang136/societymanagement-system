import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function Otp() {
  const [step, setStep] = useState('otp') // 'otp' or 'reset'
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [timer, setTimer] = useState(30)

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleVerify = () => {
    // Here you would typically verify the OTP with your backend
    // For this example, we'll just move to the reset password step
    setStep('reset')
  }

  const handleResetPassword = () => {
    // Here you would typically send the new password to your backend
    // For this example, we'll just log the new password
    console.log('Password reset:', newPassword)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:block lg:w-1/2 bg-[#F6F8FB]">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 mt-5 ms-10 text-5xl">
            <span className="text-orange-500 ">Dash</span>Stack
          </h1>
        <div className=" flex items-center justify-center">
          <img src="../assets/forget.jpg" alt="Password reset illustration" className="max-w-md" />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-xl">
         
          <div className="bg-white shadow-md rounded-lg p-8">
            {step === 'otp' ? (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Enter OTP</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Please enter the 6 digit code that sent to your phone number.
                </p>
                <div className="flex justify-between mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-gray-600">{timer} sec</span>
                  <button className="text-sm text-orange-500 font-semibold">Resend OTP</button>
                </div>
                <button
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-md font-semibold hover:from-orange-600 hover:to-orange-700 transition-colors"
                  onClick={handleVerify}
                >
                  Verify
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Reset Password</h2>
                <div className="mb-4">
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password<span className='text-red-500'>*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter New Password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password<span className='text-red-500'>*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm New Password"
                    />
                  </div>
                </div>
                <button
            type="submit"
                className="text-white mt-6 p-2 rounded-lg w-full"
                style={{
                    background: "linear-gradient(to right, #FE512E, #F09619)",
                    transition: "background 0.3s ease",
                }}
                onClick={handleResetPassword}
                >
                  
                
                  Reset Password
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
    </div>
  )
}