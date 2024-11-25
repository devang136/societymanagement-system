import React, { useState } from 'react';
import { RequestTable } from './RequestTable';
import { RequestModal } from './RequestModal';
import { DeleteModal } from '../shared/DeleteModal';
import type { Request, RequestFormData } from '../../types';
import { Bell } from 'lucide-react';

const initialRequests: Request[] = [
  {
    id: 'R1001',
    requesterName: 'Evelyn Harper',
    requestName: 'Maintenance Request',
    description: 'AC unit needs servicing',
    unitNumber: 'A1001',
    priority: 'Medium',
    status: 'Pending',
    date: '2024-03-15',
    wing: 'A',
    unit: '1001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harper'
  },
  {
    id: 'R1002',
    requesterName: 'Esther Howard',
    requestName: 'Amenity Access',
    description: 'Request for gym access card',
    unitNumber: 'B1002',
    priority: 'Low',
    status: 'Open',
    date: '2024-03-14',
    wing: 'B',
    unit: '1002',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Howard'
  },
  {
    id: 'R1003',
    requesterName: 'Jenny Wilson',
    requestName: 'Parking Space',
    description: 'Additional parking space request',
    unitNumber: 'C1003',
    priority: 'High',
    status: 'Completed',
    date: '2024-03-13',
    wing: 'C',
    unit: '1003',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wilson'
  }
];

export function RequestTracking() {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit' | 'view';
    data?: RequestFormData;
  }>({
    isOpen: false,
    mode: 'create'
  });
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    requestId?: string;
  }>({
    isOpen: false
  });

  const handleCreateRequest = () => {
    setModalState({ isOpen: true, mode: 'create' });
  };

  const handleViewRequest = (request: Request) => {
    setModalState({
      isOpen: true,
      mode: 'view',
      data: request
    });
  };

  const handleEditRequest = (request: Request) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      data: request
    });
  };

  const handleDeleteRequest = (id: string) => {
    setDeleteModal({ isOpen: true, requestId: id });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.requestId) {
      setRequests(requests.filter(r => r.id !== deleteModal.requestId));
      setDeleteModal({ isOpen: false });
    }
  };

  const handleSubmit = (data: RequestFormData) => {
    if (modalState.mode === 'create') {
      const newRequest: Request = {
        ...data,
        id: `R${Date.now()}`,
        unitNumber: `${data.wing}${data.unit}`,
        date: new Date().toISOString().split('T')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.requesterName}`
      };
      setRequests([newRequest, ...requests]);
    } else if (modalState.mode === 'edit' && modalState.data) {
      setRequests(requests.map(r => 
        r.id === (modalState.data as Request).id 
          ? { ...r, ...data, unitNumber: `${data.wing}${data.unit}` }
          : r
      ));
    }
    setModalState({ isOpen: false, mode: 'create' });
  };

  return (
    <div className="p-8">
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-8 py-4">
          <h1 className="text-xl font-semibold">Service Requests</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-2">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium">Admin User</p>
                <p className="text-sm text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-semibold">Service Requests</h2>
          <button
            onClick={handleCreateRequest}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Create Request
          </button>
        </div>

        <RequestTable
          requests={requests}
          onView={handleViewRequest}
          onEdit={handleEditRequest}
          onDelete={handleDeleteRequest}
        />

        <RequestModal
          isOpen={modalState.isOpen}
          mode={modalState.mode}
          data={modalState.data}
          onClose={() => setModalState({ isOpen: false, mode: 'create' })}
          onSubmit={handleSubmit}
        />

        <DeleteModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false })}
          onConfirm={handleConfirmDelete}
        />
      </main>
    </div>
  );
} 