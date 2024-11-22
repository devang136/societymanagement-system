import React, { useState } from 'react';

interface Income {
  id: number;
  date: string;
  category: string;
  amount: number;
  description: string;
  status: 'Received' | 'Pending';
}

const FinancialIncome: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([
    {
      id: 1,
      date: '2024-03-15',
      category: 'Maintenance Fee',
      amount: 5000,
      description: 'Monthly maintenance fee from Unit A-101',
      status: 'Received',
    },
    // Add more sample data as needed
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'Received' | 'Pending'>('all');

  const filteredIncomes = incomes.filter(income =>
    filterStatus === 'all' ? true : income.status === filterStatus
  );

  const totalReceived = incomes
    .filter(income => income.status === 'Received')
    .reduce((sum, income) => sum + income.amount, 0);

  const totalPending = incomes
    .filter(income => income.status === 'Pending')
    .reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Income Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Income
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Received</h3>
          <p className="text-2xl text-green-600">₹{totalReceived.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Pending</h3>
          <p className="text-2xl text-orange-600">₹{totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Filter by Status</h3>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'Received' | 'Pending')}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All</option>
            <option value="Received">Received</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredIncomes.map((income) => (
              <tr key={income.id}>
                <td className="px-6 py-4 whitespace-nowrap">{income.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{income.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{income.amount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{income.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    income.status === 'Received' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {income.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Income Modal would go here */}
    </div>
  );
};

export default FinancialIncome;
