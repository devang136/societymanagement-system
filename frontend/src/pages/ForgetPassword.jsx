import React, { useState, FormEvent } from 'react'

export default function ForgetPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send a request to your backend to initiate the password reset process
    console.log('Password reset requested for:', email)
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
  <div className="w-full max-w-xl px-6"> 

    <div
      className="bg-white shadow-md rounded-lg p-8 relative"
      style={{
        backgroundImage: "url('../img/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >

      <div className="absolute inset-0 bg-white opacity-90 rounded-lg"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 leading-normal" >Forget Password</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email and we'll send you a otp to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email or Phone<span className='text-red-500'>*</span>
            </label>
            <input
              id="email"
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter Email or Phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
                className="text-white mt-6 p-2 rounded-lg w-full"
                style={{
                    background: "linear-gradient(to right, #FE512E, #F09619)",
                    transition: "background 0.3s ease",
                }}
                >
            Get OTP
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-orange-500 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}
