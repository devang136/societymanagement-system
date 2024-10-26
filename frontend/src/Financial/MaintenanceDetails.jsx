import React from 'react';
import { ChevronDown, Bell } from 'lucide-react';

interface Member {
  unitNumber: string;
  paymentDate: string;
  status: 'Owner' | 'Tenant';
  phoneNumber: string;
  amount: number;
  paymentMethod: 'Cash' | 'Online';
}

const members: Member[] = [
  { unitNumber: '1001', paymentDate: '10/07/2024', status: 'Owner', phoneNumber: '92524 12365', amount: 1000, paymentMethod: 'Cash' },
  { unitNumber: '1002', paymentDate: '11/07/2024', status: 'Tenant', phoneNumber: '92469 12865', amount: 1000, paymentMethod: 'Online' },
  { unitNumber: '1003', paymentDate: '12/07/2024', status: 'Owner', phoneNumber: '92434 2365', amount: 1000, paymentMethod: 'Cash' },
  { unitNumber: '1004', paymentDate: '13/07/2024', status: 'Tenant', phoneNumber: '93536 13448', amount: 1000, paymentMethod: 'Online' },
  { unitNumber: '2001', paymentDate: '14/07/2024', status: 'Owner', phoneNumber: '92328 23565', amount: 1000, paymentMethod: 'Cash' },
  { unitNumber: '2002', paymentDate: '15/07/2024', status: 'Tenant', phoneNumber: '92524 12365', amount: 1000, paymentMethod: 'Online' },
  { unitNumber: '2003', paymentDate: '16/07/2024', status: 'Owner', phoneNumber: '92484 12025', amount: 1000, paymentMethod: 'Cash' },
  { unitNumber: '2004', paymentDate: '17/07/2024', status: 'Tenant', phoneNumber: '921021 12425', amount: 1000, paymentMethod: 'Online' },
  { unitNumber: '3001', paymentDate: '18/07/2024', status: 'Owner', phoneNumber: '92738 14235', amount: 1000, paymentMethod: 'Online' },
  { unitNumber: '3002', paymentDate: '19/07/2024', status: 'Tenant', phoneNumber: '92830 12329', amount: 1000, paymentMethod: 'Cash' },
  { unitNumber: '3003', paymentDate: '20/07/2024', status: 'Owner', phoneNumber: '92308 12389', amount: 1000, paymentMethod: 'Online' },
];

export default function GaneshChaturthi() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-screen">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-orange-500">DashStack</h1>
          </div>
          <nav className="mt-8">
            <a href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Dashboard</a>
            <a href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Resident Management</a>
            <a href="#" className="block py-2 px-4 bg-gray-100 text-orange-500">Financial Management</a>
            <a href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Facility Management</a>
            <a href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Complaint Tracking</a>
            <a href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Security Management</a>
            <a href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Security Guard</a>
            <a href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Announcement</a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Maintenance Details</h2>
            <div className="flex items-center space-x-4">
              <Bell className="text-gray-600" />
              <img src="/placeholder-avatar.jpg" alt="User" className="w-8 h-8 rounded-full" />
            </div>
          </header>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Ganesh Chaturthi Participator Member List</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Number</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant/Owner Status</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {members.map((member, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-pink-500'][index % 6]}`}></div>
                          <div className="text-sm font-medium text-gray-900">{member.unitNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.paymentDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === 'Owner' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.phoneNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹ {member.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${member.paymentMethod === 'Cash' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
                          {member.paymentMethod}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}