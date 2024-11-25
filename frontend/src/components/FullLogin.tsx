// import React, { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';

// const FullLogin = () => {
//   const [currentView, setCurrentView] = useState<'login' | 'register' | 'forgot-password' | 'reset-password'>('login');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [resetEmail, setResetEmail] = useState('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//   };

//   const handleResetPasswordSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Reset password email submitted:', resetEmail);
//   };

//   const renderView = () => {
//     switch (currentView) {
//       case 'login':
//         return (
//           <div className="bg-white p-8 rounded-xl shadow-xl">
//             <h2 className="text-3xl font-bold text-gray-900 mb-8">Login</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF5733]"
//                   required
//                 />
//               </div>
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF5733]"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5 text-gray-400" />
//                     ) : (
//                       <Eye className="h-5 w-5 text-gray-400" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-3 px-4 bg-gradient-to-r from-[#FF5733] to-[#ff4520] text-white rounded-lg shadow-sm"
//               >
//                 Login
//               </button>
//               <p className="mt-4 text-center">
//                 Don't have an account?{' '}
//                 <button onClick={() => setCurrentView('register')} className="text-blue-500">
//                   Register
//                 </button>
//               </p>
//               <p className="mt-4 text-center">
//                 <button onClick={() => setCurrentView('forgot-password')} className="text-blue-500">
//                   Forgot Password?
//                 </button>
//               </p>
//             </form>
//           </div>
//         );
//       case 'forgot-password':
//         return (
//           <div className="bg-white p-8 rounded-xl shadow-xl">
//             <h2 className="text-3xl font-bold text-gray-900 mb-8">Forgot Password</h2>
//             <form onSubmit={handleResetPasswordSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Enter your email</label>
//                 <input
//                   type="email"
//                   value={resetEmail}
//                   onChange={(e) => setResetEmail(e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF5733]"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-3 px-4 bg-gradient-to-r from-[#FF5733] to-[#ff4520] text-white rounded-lg shadow-sm"
//               >
//                 Reset Password
//               </button>
//               <p className="mt-4 text-center">
//                 <button onClick={() => setCurrentView('login')} className="text-blue-500">
//                   Back to Login
//                 </button>
//               </p>
//             </form>
//           </div>
//         );
//       case 'register':
//         return (
//           <div className="bg-white p-8 rounded-xl shadow-xl">
//             <h2 className="text-3xl font-bold text-gray-900 mb-8">Registration</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF5733]"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF5733]"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5 text-gray-400" />
//                     ) : (
//                       <Eye className="h-5 w-5 text-gray-400" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF5733]"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="h-5 w-5 text-gray-400" />
//                     ) : (
//                       <Eye className="h-5 w-5 text-gray-400" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-3 px-4 bg-gradient-to-r from-[#FF5733] to-[#ff4520] text-white rounded-lg shadow-sm"
//               >
//                 Register
//               </button>
//               <p className="mt-4 text-center">
//                 Already have an account?{' '}
//                 <button onClick={() => setCurrentView('login')} className="text-blue-500">
//                   Login
//                 </button>
//               </p>
//             </form>
//           </div>
//         );
//       case 'reset-password':
//         return (
//           <div className="bg-white p-8 rounded-xl shadow-xl">
//             <h2 className="text-3xl font-bold text-gray-900 mb-8">Reset Password</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">New Password</label>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF5733]"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-3 px-4 bg-gradient-to-r from-[#FF5733] to-[#ff4520] text-white rounded-lg shadow-sm"
//               >
//                 Reset Password
//               </button>
//               <p className="mt-4 text-center">
//                 <button onClick={() => setCurrentView('login')} className="text-blue-500">
//                   Back to Login
//                 </button>
//               </p>
//             </form>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return <div className="max-w-md mx-auto mt-10">{renderView()}</div>;
// };

// export default FullLogin;
