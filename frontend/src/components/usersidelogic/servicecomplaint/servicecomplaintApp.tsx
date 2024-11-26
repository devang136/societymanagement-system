import React, { useState } from 'react';
import { Complaint, Request } from './types';
import { Header } from './components/Layout/Header';
import { ComplaintCard } from './components/Complaints/ComplaintCard';
import { ComplaintForm } from './components/Complaints/ComplaintForm';
import { RequestCard } from './components/Requests/RequestCard';
import { RequestForm } from './components/Requests/RequestForm';
import { Tabs } from './components/Tabs';

function App() {
  const [activeTab, setActiveTab] = useState<'complaint' | 'request'>('complaint');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const handleComplaintSubmit = (complaintData: Omit<Complaint, 'id'>) => {
    const newComplaint = {
      ...complaintData,
      id: Math.random().toString(36).substr(2, 9)
    };
    setComplaints(prev => [...prev, newComplaint]);
    setShowComplaintForm(false);
  };

  const handleRequestSubmit = (requestData: Omit<Request, 'id'>) => {
    const newRequest = {
      ...requestData,
      id: Math.random().toString(36).substr(2, 9)
    };
    setRequests(prev => [...prev, newRequest]);
    setShowRequestForm(false);
  };

  const handleComplaintDelete = (id: string) => {
    setComplaints(prev => prev.filter(c => c.id !== id));
  };

  const handleRequestDelete = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const user = {
    name: 'Moni Roy',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <main>
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'complaint' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold">Complaint</h1>
                <p className="text-gray-500">Manage your complaints</p>
              </div>
              <button
                onClick={() => setShowComplaintForm(true)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Create Complaint
              </button>
            </div>

            {showComplaintForm ? (
              <ComplaintForm
                onSubmit={handleComplaintSubmit}
                onCancel={() => setShowComplaintForm(false)}
              />
            ) : (
              <div className="space-y-4">
                {complaints.map(complaint => (
                  <ComplaintCard
                    key={complaint.id}
                    complaint={complaint}
                    onDelete={handleComplaintDelete}
                  />
                ))}
                {complaints.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No complaints yet. Create one to get started.
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold">Request</h1>
                <p className="text-gray-500">Manage your requests</p>
              </div>
              <button
                onClick={() => setShowRequestForm(true)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Create Request
              </button>
            </div>

            {showRequestForm ? (
              <RequestForm
                onSubmit={handleRequestSubmit}
                onCancel={() => setShowRequestForm(false)}
              />
            ) : (
              <div className="space-y-4">
                {requests.map(request => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onDelete={handleRequestDelete}
                  />
                ))}
                {requests.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No requests yet. Create one to get started.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;