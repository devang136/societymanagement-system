import React, { useState } from 'react';
import Header from './Header';
import VisitorRow from './VisitorRow';
import { Search } from 'lucide-react';

const visitors = [
  {
    name: "Evelyn Harper",
    phone: "97852 12369",
    date: "10/01/2024",
    unit: "1001",
    time: "3:45 PM",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
  },
  {
    name: "Wade Warren",
    phone: "97852 25893",
    date: "11/01/2024",
    unit: "1002",
    time: "2:45 AM",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
  },
  {
    name: "Guy Hawkins",
    phone: "97589 55563",
    date: "12/01/2024",
    unit: "1003",
    time: "3:00 PM",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  },
  {
    name: "Robert Fox",
    phone: "97444 96323",
    date: "13/01/2024",
    unit: "1004",
    time: "5:30 AM",
    avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150"
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVisitors = visitors.filter(visitor =>
    visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.unit.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Recent Visitors</h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search visitors or units"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="grid grid-cols-5 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div>Visitor Name</div>
              <div>Phone Number</div>
              <div>Date</div>
              <div>Unit Number</div>
              <div>Time</div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredVisitors.map((visitor, index) => (
              <VisitorRow key={index} visitor={visitor} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;