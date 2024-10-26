import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'

const RegistrationForm = () => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setContry] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const societies = [
    'Shantigram Residency',
    'Russet House Park',
    'Saurya Residency',
    'Sharnukh Avenue',
    'Utsav Society',
    'Murldhar',
    'Shree Sharnam',
    'Vasantnagar Township',
  ];



  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block lg:w-1/2 bg-[#F6F8FB]">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 mt-5 ms-10 text-5xl">
          <span className="text-orange-500 ">Dash</span>Stack
        </h1>
        <div className=" flex items-center justify-center">
          <img src="#" alt="Password reset illustration" className="max-w-md" />
        </div>
      </div>

      {/* Right part: Registration form */}
      <div className="w-1/2 flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: 'url("../assets/background.jpg")' }}>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
          <h2 className="text-3xl font-bold mb-6 leading-normal">Registration</h2>
          <form >
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-5">
                <label htmlFor="fname" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className='text-red-500'>*</span>
                </label>
                <input
                  id="fname"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter First Name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="lname" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className='text-red-500'>*</span>
                </label>
                <input
                  id="lname"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter Last Name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address  <span className='text-red-500'>*</span>
                </label>
                <input
                  id="email"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter Email Address "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className='text-red-500'>*</span>
                </label>
                <input
                  id="phone"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="91+"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="mb-5">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country  <span className='text-red-500'>*</span>
                </label>
                <input
                  id="country"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter Name"
                  value={country}
                  onChange={(e) => setContry(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className='text-red-500'>*</span>
                </label>
                <input
                  id="state"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter Name"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className='text-red-500'>*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter Name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Select Society  <span className='text-red-500'>*</span>
              </label>
              <select
                name="society"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="" className="block text-sm font-medium text-gray-700 ">Select Society</option>
                {societies.map((society, index) => (
                  <option key={index} value={society}>
                    {society}
                  </option>

                ))}
              </select>
            </div>

            <div className="mb-5">
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                Password<span className='text-red-500'>*</span>
              </label>
              <div className="mt-1 relative">
                <input
                  id="new-password"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter Password"
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

            <div className="mb-5">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password<span className='text-red-500'>*</span>
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter Confirm Password"
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

            <div className="mt-4 flex items-center">
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms" className="text-sm">
                I agree to all the Terms and{' '}
                <span className="text-orange-500">Privacy Policies</span>
              </label>
            </div>

            <button
              type="submit"
              className="text-white mt-6 p-2 rounded-lg w-full"
              style={{
                background: "linear-gradient(to right, #FE512E, #F09619)",
                transition: "background 0.3s ease",
              }}
            >
              Register
            </button>

            <p className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <a href="/" className="text-orange-500 hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
