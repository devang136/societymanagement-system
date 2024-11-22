import React, { useState } from 'react';

interface Request {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'New' | 'In Progress' | 'Resolved';
  dateSubmitted: string;
  lastUpdated: string;
  submittedBy: string;
  assignedTo: string;
}

const RequestTracking: React.FC = () => {
  const [requests] = useState<Request[]>([
    {
      id: 1,
      title: 'AC Maintenance Request',
      description: 'AC unit in apartment 301 needs servicing',
      category: 'Maintenance',
      priority: 'High',
      status: 'In Progress',
      dateSubmitted: '2024-03-10',
      lastUpdated: '2024-03-12',
      submittedBy: 'John Doe',
      assignedTo: 'Maintenance Team A',
    },
    // Add more sample requests as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'New' | 'In Progress' | 'Resolved'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'High' | 'Medium' | 'Low'>('all');

  const filteredRequests = requests.filter(request =>
    (filterStatus === 'all' || request.status === filterStatus) &&
    (filterPriority === 'all' || request.priority === filterPriority) &&
    (request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     request.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Request Tracking</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'New' | 'In Progress' | 'Resolved')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Status</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as 'all' | 'High' | 'Medium' | 'Low')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Priority</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Submitted By</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Assigned To</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Last Updated</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{request.title}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{request.category}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{request.submittedBy}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{request.assignedTo}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{request.lastUpdated}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">Update</button>
                    <button className="text-gray-600 hover:text-gray-900">View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestTracking;
