import React, { useState, useEffect } from 'react';
import { Complaint, Request, Status, Priority } from './types';
import { Header } from './components/Layout/Header';
import { ComplaintCard } from './components/Complaints/ComplaintCard';
import { ComplaintForm } from './components/Complaints/ComplaintForm';
import { RequestCard } from './components/Requests/RequestCard';
import { RequestForm } from './components/Requests/RequestForm';
import { Tabs } from './components/Tabs';
import { complaintService } from '../../../services/complaintService';
import { requestService } from '../../../services/requestService';
import { toast } from 'react-hot-toast';

function App() {
  const [activeTab, setActiveTab] = useState<'complaint' | 'request'>('complaint');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const data = await complaintService.getComplaints();
        setComplaints(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load complaints');
        setComplaints([]);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'complaint') {
      fetchComplaints();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const data = await requestService.getRequests();
        setRequests(data);
      } catch (error) {
        toast.error('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'request') {
      fetchRequests();
    }
  }, [activeTab]);

  const handleComplaintSubmit = async (complaintData: Omit<Complaint, 'id'>) => {
    try {
      const formattedData = {
        ...complaintData,
        status: 'Open' as Status,
        priority: complaintData.priority || 'Medium' as Priority,
      };
      
      console.log('Submitting complaint:', formattedData);
      const newComplaint = await complaintService.createComplaint(formattedData);
      console.log('Created complaint:', newComplaint);
      
      if (newComplaint) {
        setComplaints(prev => [...prev, newComplaint]);
        toast.success('Complaint created successfully');
        setShowComplaintForm(false);
      }
    } catch (error: any) {
      console.error('Error creating complaint:', error);
      toast.error(error.response?.data?.message || 'Failed to create complaint');
    }
  };

  const handleRequestSubmit = async (requestData: Omit<Request, 'id'>) => {
    try {
      const newRequest = await requestService.createRequest(requestData);
      setRequests(prev => [...prev, newRequest]);
      toast.success('Request created successfully');
      setShowRequestForm(false);
    } catch (error) {
      toast.error('Failed to create request');
    }
  };

  const handleComplaintDelete = async (id: string) => {
    try {
      await complaintService.deleteComplaint(id);
      setComplaints(prev => prev.filter(c => c.id !== id));
      toast.success('Complaint deleted successfully');
    } catch (error) {
      toast.error('Failed to delete complaint');
    }
  };

  const handleRequestDelete = async (id: string) => {
    try {
      await requestService.deleteRequest(id);
      setRequests(prev => prev.filter(r => r.id !== id));
      toast.success('Request deleted successfully');
    } catch (error) {
      toast.error('Failed to delete request');
    }
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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </main>
    </div>
  );
}

export default App;