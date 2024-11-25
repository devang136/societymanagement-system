import React, { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { FiPlus, FiBell, FiSearch } from 'react-icons/fi';
import { StatCard } from './StatCard';
import { ComplaintRow } from './ComplaintRow';
import { ImportantNumber } from './ImportantNumber';
import { PendingMaintenance } from './PendingMaintenance';
import { UpcomingActivity } from './UpcomingActivity';
import AddImportantNumber from '../dashboardmodals/AddImportantNumber';
import { Notification } from './Notification';
import ProfileView from '../editprofile/ProfileView';
import ProfileEdit from '../editprofile/ProfileEdit';

interface DashboardProps {
  onLogout: () => void;
  userRole: 'admin' | 'user' | 'security' | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout, userRole }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Moni",
    lastName: "Roy",
    phoneNumber: "+91 99130 44537",
    email: "admin@example.com",
    society: "Shantigram residency",
    country: "India",
    state: "Gujarat",
    city: "Baroda"
  });

  const handleProfileClick = () => {
    setIsProfileOpen(true);
    setActiveMenuItem('profile');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateProfile = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const data = [
    { name: 'Jan', value: 10000 },
    { name: 'Feb', value: 15000 },
    { name: 'Mar', value: 20000 },
    { name: 'Apr', value: 25000 },
    { name: 'May', value: 30000 },
    { name: 'Jun', value: 35000 },
    { name: 'Jul', value: 55000 },
  ];

  const [isAddNumberOpen, setIsAddNumberOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [importantNumbers] = useState([
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

  const [pendingMaintenances] = useState([
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

  const [upcomingActivities] = useState<Array<{
    id: number;
    title: string;
    type: 'society' | 'holi' | 'ganesh' | 'navratri';
    timeRange: string;
    date: string;
  }>>([
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

  const [complaints] = useState([
    {
      id: 1,
      name: 'Evelyn Harper',
      complaintName: 'Unethical Behavior',
      date: '01/02/2024',
      priority: 'Medium' as const,
      status: 'Open' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
    },
    {
      id: 2,
      name: 'Evelyn Harper',
      complaintName: 'Unethical Behavior',
      date: '01/02/2024',
      priority: 'Low' as const,
      status: 'Pending' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
    },
    {
      id: 3,
      name: 'Evelyn Harper',
      complaintName: 'Unethical Behavior',
      date: '01/02/2024',
      priority: 'High' as const,
      status: 'Solve' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3'
    }
  ]);

  const handleAddNumber = (data: any) => {
    console.log('Adding number:', data);
  };

  const handleSidebarMenuChange = (menuItem: string) => {
    setActiveMenuItem(menuItem);
    if (menuItem === 'dashboard') {
      setIsProfileOpen(false);
    }
  };

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-500">/</span>
          <span className="text-blue-600">{isProfileOpen ? 'Profile' : 'Dashboard'}</span>
        </div>
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={handleProfileClick}
        >
          {/* <div className="w-8 h-8 rounded-full bg-gray-200"></div> */}
          <div>
            {/* <div className="text-sm font-medium">Moni Roy</div>
            <div className="text-xs text-gray-500">Admin</div> */}
          </div>
        </div>
      </div>

      {isProfileOpen ? (
        isEditing ? (
          <ProfileEdit 
            onCancel={handleCancelEdit}
            onUpdate={handleUpdateProfile}
            profileData={profileData}
          />
        ) : (
          <ProfileView 
            profileData={profileData}
            onEditClick={handleEditClick}
          />
        )
      ) : (
        // Your existing dashboard content
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
              <div className="flex items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
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
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#f97316"
                      fill="#fed7aa"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Important Numbers */}
            <div className="col-span-3 bg-white p-6 rounded-lg shadow-sm h-[400px] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Important Numbers</h2>
                <button
                  onClick={() => setIsAddNumberOpen(true)}
                  className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  <FiPlus />
                </button>
              </div>
              <div className="space-y-4">
                {importantNumbers.map((number) => (
                  <ImportantNumber
                    key={number.id}
                    number={number}
                    onEdit={(id, data) => console.log('Edit', id, data)}
                    onDelete={(id) => console.log('Delete', id)}
                  />
                ))}
              </div>
            </div>

            {/* Pending Maintenances */}
            <div className="col-span-3 bg-white p-6 rounded-lg shadow-sm h-[400px] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Pending Maintenances</h2>
                <button className="text-sm text-blue-500 hover:text-blue-600">View all</button>
              </div>
              <div className="space-y-4">
                {pendingMaintenances.map((maintenance) => (
                  <PendingMaintenance
                    key={maintenance.id}
                    maintenance={maintenance}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-12 gap-6 mt-6">
            {/* Complaints */}
            <div className="col-span-9 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Complaint List</h2>
                <select className="border rounded-md px-3 py-1">
                  <option>Month</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="pb-4">Complainer Name</th>
                      <th className="pb-4">Complaint Name</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Priority</th>
                      <th className="pb-4">Complaint Status</th>
                      <th className="pb-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((complaint) => (
                      <ComplaintRow
                        key={complaint.id}
                        complaint={complaint}
                        onEdit={(id, data) => console.log('Edit', id, data)}
                        onDelete={(id) => console.log('Delete', id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming Activity */}
            <div className="col-span-3 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Upcoming Activity</h2>
                <select className="border rounded-md px-3 py-1">
                  <option>Month</option>
                </select>
              </div>
              <div className="space-y-4">
                {upcomingActivities.map((activity) => (
                  <UpcomingActivity
                    key={activity.id}
                    activity={activity}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
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