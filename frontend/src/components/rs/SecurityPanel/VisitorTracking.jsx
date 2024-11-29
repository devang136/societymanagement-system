import Avatar from '../components/assets/Avatar.jpg';
import React, { useState } from 'react';
import { FaSquarePlus } from "react-icons/fa6";
import AddVisitorModal from './AddVisitorModal';

export default function VisitorTracking() {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const visitors = [
        {
            name: "Evelyn Harper",
            phone: "97852 12369",
            date: "10/01/2024",
            unit: { code: "A", number: "1001" },
            time: "3:45 PM"
          },
          {
            name: "Wade Warren",
            phone: "97852 25893",
            date: "11/01/2024",
            unit: { code: "B", number: "1002" },
            time: "2:45 AM"
          },
          {
            name: "Guy Hawkins",
            phone: "975869 55563",
            date: "12/01/2024",
            unit: { code: "C", number: "1003" },
            time: "3:00 PM"
          },
          {
            name: "Robert Fox",
            phone: "97444 96323",
            date: "13/01/2024",
            unit: { code: "D", number: "1004" },
            time: "5:30 AM"
          },
          {
            name: "Jacob Jones",
            phone: "97123 12563",
            date: "14/01/2024",
            unit: { code: "E", number: "2001" },
            time: "12:45 PM"
          },
    ];
  
    return (
      <div className="flex bg-[#F0F5FB]">
        <main className="flex-1 overflow-x-hidden overflow-y-auto ">
          <div className="container mx-auto py-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#202224] font-poppins">Visitor Tracking</h3>
                <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 rounded-md  px-2 py-2 text-sm text-white hover:from-orange-600 hover:to-orange-700"
                style={{
                  background: "linear-gradient(to right, #FE512E, #F09619)",
                  transition: "background 0.3s ease",
                }}
              >
                <FaSquarePlus className="text-base" />
                <span className='font-bold'>Add Visitor Tracking</span>
              </button>
              </div>
              <div className="overflow-x-auto px-6 py-1">
                <table className="min-w-full rounded-t-lg divide-y divide-gray-200">
                  <thead className="bg-[#5678E9]/10">
                    <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-[#000000] font-poppins tracking-wider">
                        Visitor Name
                      </th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-[#000000] font-poppins tracking-wider">
                        Phone Number
                      </th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-[#000000] font-poppins tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-[#000000] font-poppins tracking-wider">
                        Unit Number
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-[#000000] font-poppins tracking-wider">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {visitors.map((visitor, index) => (
                      <tr key={index}>
                         <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={Avatar} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900"> {visitor.name}</div>
                          </div>
                        </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {visitor.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {visitor.date}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-center">
                        <div className='flex items-center justify-center gap-2 text-center'>
                        <span className="w-6 h-6 rounded-full bg-[#F6F8FB] text-[#5678E9] font-semibold flex items-center justify-center">
                        {visitor.unit.code}
                        </span>  
                        <span>{visitor.unit.number}</span>
                        </div>
                      </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-end">
                          <span className='bg-[#f8f6fb] rounded-xl px-3 py-1'>{visitor.time}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
        <AddVisitorModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      </div>
    );
  }
  