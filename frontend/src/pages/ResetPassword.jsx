import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
        <div className="w-full max-w-xl px-6">

          <div
            className="bg-white shadow-md rounded-lg p-8 relative"
            style={{
              backgroundImage: "url('../assets/background.jpg')", 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >

            <div className="absolute inset-0 bg-white opacity-90 rounded-lg"></div>
            

            <div className="relative z-10">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800 font-bold">Resent Password</h2>
              
              <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  New Password<span className='text-red-500'>*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    id="new-password"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="••••••••"
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
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password<span className='text-red-500'>*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
            <button
            type="submit"
                className="text-white mt-6 p-2 rounded-lg w-full"
                style={{
                    background: "linear-gradient(to right, #FE512E, #F09619)",
                    transition: "background 0.3s ease",
                }}
                >
                Reset Password
              </button>
            </div>
          </form>
            </div>
          </div>
        </div>
      </div>




    </div>
  )
}