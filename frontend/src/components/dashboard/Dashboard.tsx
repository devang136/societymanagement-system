import React, { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { FiPlus, FiBell, FiSearch } from 'react-icons/fi';
import { StatCard } from './StatCard';
import { ComplaintRow } from './ComplaintRow';
import { Sidebar } from './Sidebar';
import { ImportantNumber } from './ImportantNumber';
import { PendingMaintenance } from './PendingMaintenance';
import { UpcomingActivity } from './UpcomingActivity';
import { AddImportantNumber } from './modals/AddImportantNumber';
import { Notification } from './Notification';

interface Complaint {
  id: number;
  name: string;
  complaintName: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'New' | 'In Progress' | 'Resolved';
  avatar: string;
  description: string;
  wing: string;
  unit: string;
}

interface ImportantNumberData {
  id: number;
  name: string;
  phoneNumber: string;
  work: string;
}

interface PendingMaintenanceData {
  id: number;
  name: string;
  amount: number;
  avatar: string;
  date: string;
}

interface UpcomingActivityData {
  id: number;
  title: string;
  type: 'society' | 'holi' | 'ganesh' | 'navratri';
  timeRange: string;
  date: string;
}

const data = [
  { name: 'Jan', value: 10000 },
  { name: 'Feb', value: 15000 },
  { name: 'Mar', value: 20000 },
  { name: 'Apr', value: 25000 },
  { name: 'May', value: 30000 },
  { name: 'Jun', value: 35000 },
  { name: 'Jul', value: 55000 },
];

export function Dashboard() {
  const [isAddNumberOpen, setIsAddNumberOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [importantNumbers, setImportantNumbers] = useState<ImportantNumberData[]>([
    {
      id: 1,
      name: 'Hamna Darin',
      phoneNumber: '+91 99567 33567',
      work: 'Plumber'
    },
    {
      id: 2,
      name: 'Hamna Darin',
      phoneNumber: '+91 99567 33567',
      work: 'Plumber'
    },
    {
      id: 3,
      name: 'Hamna Darin',
      phoneNumber: '+91 99567 33567',
      work: 'Plumber'
    }
  ]);

  const [pendingMaintenances] = useState<PendingMaintenanceData[]>([
    {
      id: 1,
      name: 'Roger Lubin',
      amount: 5000,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      date: '2 days pending'
    },
    {
      id: 2,
      name: 'Roger Lubin',
      amount: 5000,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
      date: '2 days pending'
    },
    {
      id: 3,
      name: 'Roger Lubin',
      amount: 5000,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6',
      date: '2 days pending'
    }
  ]);

  const [upcomingActivities] = useState<UpcomingActivityData[]>([
    {
      id: 1,
      title: 'Society Meeting',
      type: 'society',
      timeRange: '9:00 PM to 10:00 PM',
      date: '24-09-2024'
    },
    {
      id: 2,
      title: 'Holi Festival',
      type: 'holi',
      timeRange: '9:00 PM to 10:00 PM',
      date: '24-09-2024'
    },
    {
      id: 3,
      title: 'Ganesh Chaturthi',
      type: 'ganesh',
      timeRange: '9:00 PM to 10:00 PM',
      date: '24-09-2024'
    },
    {
      id: 4,
      title: 'Navratri Festival',
      type: 'navratri',
      timeRange: '9:00 PM to 10:00 PM',
      date: '24-09-2024'
    }
  ]);

  const [complaints] = useState<Complaint[]>([
    {
      id: 1,
      name: 'Evelyn Harper',
      complaintName: 'Unethical Behavior',
      date: '01/02/2024',
      priority: 'Medium',
      status: 'New',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      description: 'Unethical behavior in common area',
      wing: 'A',
      unit: 'A101'
    },
    {
      id: 2,
      name: 'Evelyn Harper',
      complaintName: 'Unethical Behavior',
      date: '01/02/2024',
      priority: 'Low',
      status: 'In Progress',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      description: 'Unethical behavior in parking area',
      wing: 'B',
      unit: 'B202'
    },
    {
      id: 3,
      name: 'Evelyn Harper',
      complaintName: 'Unethical Behavior',
      date: '01/02/2024',
      priority: 'High',
      status: 'Resolved',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      description: 'Unethical behavior in garden area',
      wing: 'C',
      unit: 'C303'
    }
  ]);

  const handleAddNumber = (data: ImportantNumberData) => {
    setImportantNumbers([...importantNumbers, { ...data, id: importantNumbers.length + 1 }]);
    setIsAddNumberOpen(false);
  };

  const handleEditComplaint = (id: number, data: Complaint) => {
    // Implement complaint edit logic
    console.log('Editing complaint:', id, data);
  };

  const handleDeleteComplaint = (id: number) => {
    // Implement complaint delete logic
    console.log('Deleting complaint:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-6">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search here"
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsNotificationOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <FiBell className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                  alt="Admin"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="text-sm font-medium">Moni Roy</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
              </div>
            </div>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Balance" value="₹ 2,22,520" color="orange" />
            <StatCard title="Total Income" value="₹ 55,000" color="green" />
            <StatCard title="Total Expense" value="₹ 20,550" color="blue" />
            <StatCard title="Total Unit" value="₹ 20,550" color="purple" />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Chart */}
            <div className="col-span-6 bg-white p-6 rounded-lg shadow-sm h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Total Balance</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="lastMonth" name="period" defaultChecked />
                    <label htmlFor="lastMonth">Last month</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="lastYear" name="period" />
                    <label htmlFor="lastYear">Last Year</label>
                  </div>
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#f97316"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Complaints */}
            <div className="col-span-6 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-6">Recent Complaints</h2>
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-8 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                        Name
                      </th>
                      <th scope="col" className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                        Complaint
                      </th>
                      <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                        Priority
                      </th>
                      <th scope="col" className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 md:table-cell">
                        Date
                      </th>
                      <th scope="col" className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((complaint) => (
                      <ComplaintRow
                        key={complaint.id}
                        complaint={complaint}
                        onEdit={handleEditComplaint}
                        onDelete={handleDeleteComplaint}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Important Numbers */}
            <div className="col-span-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Important Numbers</h2>
                <button
                  onClick={() => setIsAddNumberOpen(true)}
                  className="p-2 text-orange-500 hover:bg-orange-50 rounded-full"
                >
                  <FiPlus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {importantNumbers.map((number) => (
                  <ImportantNumber key={number.id} number={number} />
                ))}
              </div>
            </div>

            {/* Pending Maintenance */}
            <div className="col-span-4 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Pending Maintenance</h2>
              <div className="space-y-4">
                {pendingMaintenances.map((maintenance) => (
                  <PendingMaintenance key={maintenance.id} maintenance={maintenance} />
                ))}
              </div>
            </div>

            {/* Upcoming Activities */}
            <div className="col-span-4 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Upcoming Activities</h2>
              <div className="space-y-4">
                {upcomingActivities.map((activity) => (
                  <UpcomingActivity key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddImportantNumber
        isOpen={isAddNumberOpen}
        onClose={() => setIsAddNumberOpen(false)}
        onAdd={handleAddNumber}
      />

      <Notification
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={[]}
      />
    </div>
  );
}