import { useState } from 'react';
import Header from './component/Header';
import RequestTable from './component/RequestTable';
import RequestForm from './component/RequestForm';
import ViewRequest from './component/ViewRequest';
import DeleteConfirmation from './component/DeleteConfirmation';
import React from 'react';

interface Request {
  id: string;
  requesterName: string;
  requestName: string;
  description: string;
  requestDate: string;
  unitNumber: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Open" | "Solve";
  avatar: string;
}

const mockUser = {
  name: 'Moni Roy',
  role: 'Admin',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

const mockRequests = [
  {
    id: '1001',
    requesterName: 'Evelyn Harper',
    requestName: 'Unethical Behavior',
    description: 'Regular waste collection services.',
    requestDate: '10/02/2024',
    unitNumber: 'A 1001',
    priority: 'Medium' as const,
    status: 'Pending' as const,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  // Add more mock data as needed
];

export default function App() {
  const [requests, setRequests] = useState<Request[]>(mockRequests as Request[]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const handleCreateRequest = (data: any) => {
    const newRequest = {
      id: String(Date.now()),
      ...data,
      avatar: mockUser.avatar
    };
    setRequests([...requests, newRequest]);
    setShowCreateForm(false);
  };

  const handleEditRequest = (data: any) => {
    setRequests(requests.map(req => 
      req.id === selectedRequest?.id ? { ...req, ...data } : req
    ));
    setShowEditForm(false);
    setSelectedRequest(null);
  };

  const handleDeleteRequest = () => {
    setRequests(requests.filter(req => req.id !== selectedRequest?.id));
    setShowDeleteModal(false);
    setSelectedRequest(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Create Complaint</h1>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2 bg-[#FF4D12] text-white rounded-md hover:bg-[#FF3D00]"
              >
                Create Request
              </button>
            </div>

            <div className="bg-white rounded-lg shadow">
              <RequestTable
                requests={requests}
                onView={(request) => {
                  setSelectedRequest(request);
                  setShowViewModal(true);
                }}
                onEdit={(request) => {
                  setSelectedRequest(request);
                  setShowEditForm(true);
                }}
                onDelete={(request) => {
                  setSelectedRequest(request);
                  setShowDeleteModal(true);
                }}
              />
            </div>
          </div>
        </main>
      </div>

      {showCreateForm && (
        <RequestForm
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateRequest}
        />
      )}

      {showEditForm && selectedRequest && (
        <RequestForm
          isEdit
          initialData={selectedRequest}
          onClose={() => {
            setShowEditForm(false);
            setSelectedRequest(null);
          }}
          onSubmit={handleEditRequest}
        />
      )}

      {showViewModal && selectedRequest && (
        <ViewRequest
          request={selectedRequest}
          onClose={() => {
            setShowViewModal(false);
            setSelectedRequest(null);
          }}
        />
      )}

      {showDeleteModal && selectedRequest && (
        <DeleteConfirmation
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedRequest(null);
          }}
          onConfirm={handleDeleteRequest}
        />
      )}
    </div>
  );
}