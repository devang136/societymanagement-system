import React, { useState } from 'react'

export default function SecurityProtocols() {
  const [protocols, setProtocols] = useState([
    { id: 1, title: "Physical Security", description: "Implementing surveillance cameras in public spaces.", date: "11/01/2024", time: "3:45 PM" },
    { id: 2, title: "Cybersecurity", description: "Securing critical infrastructure, government systems.", date: "12/01/2024", time: "6:40 AM" },
    { id: 3, title: "Legal Measures", description: "Enforcing and updating laws and regulations.", date: "13/01/2024", time: "1:00 PM" },
    { id: 4, title: "Social Engagement", description: "Fostering collaboration between law enforcement.", date: "14/01/2024", time: "6:20 PM" },
  ])

  return (

    <div className="flex bg-[#F0F5FB]">
    <main className="flex-1 overflow-x-hidden overflow-y-auto ">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5">
        <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#202224] font-poppins">Security Protocols</h3>
              </div>
            </div>
          <div className="overflow-x-auto px-6 py-1">
            <table className="min-w-full rounded-t-lg divide-y divide-gray-200">
              <thead className="bg-[#5678E9]/10">
                <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#000000] font-poppins tracking-wider">
                        Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#000000] font-poppins tracking-wider">
                  Description
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-[#000000] font-poppins tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-[#000000] font-poppins tracking-wider">
                  Time
                  </th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {protocols.map((protocol) => (
              <tr key={protocol.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4f4f4f] font-poppins">{protocol.title}</td>
                <td className="px-6 py-4 text-sm text-[#4f4f4f] font-poppins">{protocol.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4f4f4f] text-center font-poppins">{protocol.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4f4f4f] text-center font-poppins"><span className='bg-[#f8f6fb] rounded-xl px-3 py-1'>{protocol.time}</span></td>
              </tr>
            ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </main>
  </div>
 
  )
}