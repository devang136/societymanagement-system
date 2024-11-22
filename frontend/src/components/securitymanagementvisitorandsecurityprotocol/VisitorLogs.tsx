import React, { useState } from 'react';

interface Visitor {
  id: number;
  visitorName: string;
  purpose: string;
  hostName: string;
  hostUnit: string;
  checkIn: string;
  checkOut: string | null;
  status: 'Checked In' | 'Checked Out';
  vehicleNumber?: string;
  idType: string;
  idNumber: string;
}

const VisitorLogs: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: 1,
      visitorName: 'Alice Johnson',
      purpose: 'Personal Visit',
      hostName: 'Bob Smith',
      hostUnit: 'A-101',
      checkIn: '2024-03-15 09:30',
      checkOut: null,
      status: 'Checked In',
      vehicleNumber: 'ABC123',
      idType: 'Driver\'s License',
      idNumber: 'DL123456',
    },
    // Add more sample visitors as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Checked In' | 'Checked Out'>('all');

  const filteredVisitors = visitors.filter(visitor =>
    (filterStatus === 'all' || visitor.status === filterStatus) &&
    (visitor.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     visitor.hostName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     visitor.hostUnit.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCheckOut = (id: number) => {
    setVisitors(visitors.map(visitor =>
      visitor.id === id
        ? {
            ...visitor,
            status: 'Checked Out' as const,
            checkOut: new Date().toLocaleString(),
          }
        : visitor
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Visitor Logs</h1>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add New Visitor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search visitors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'Checked In' | 'Checked Out')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Status</option>
            <option value="Checked In">Checked In</option>
            <option value="Checked Out">Checked Out</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Visitor Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Purpose</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Host Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Unit</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Check In</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Check Out</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredVisitors.map((visitor) => (
              <tr key={visitor.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{visitor.visitorName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{visitor.purpose}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{visitor.hostName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{visitor.hostUnit}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{visitor.checkIn}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{visitor.checkOut || '-'}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      visitor.status === 'Checked In'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {visitor.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {visitor.status === 'Checked In' && (
                    <button
                      onClick={() => handleCheckOut(visitor.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Check Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorLogs;
