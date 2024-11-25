import React, { useState } from 'react';
import { ComplaintTable } from './ComplaintTable';
import { ComplaintModal } from './ComplaintModal';
import { DeleteModal } from './DeleteModal';
import type { Complaint, ComplaintFormData } from '../../../types';

export function ComplaintTracking() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit' | 'view';
    data?: ComplaintFormData;
  }>({
    isOpen: false,
    mode: 'create'
  });
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    complaintId?: string;
  }>({
    isOpen: false
  });

  const handleCreateComplaint = () => {
    setModalState({
      isOpen: true,
      mode: 'create'
    });
  };

  const handleViewComplaint = (complaint: Complaint) => {
    setModalState({
      isOpen: true,
      mode: 'view',
      data: complaint
    });
  };

  const handleEditComplaint = (complaint: Complaint) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      data: complaint
    });
  };

  const handleDeleteComplaint = (id: string) => {
    setDeleteModal({
      isOpen: true,
      complaintId: id
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.complaintId) {
      setComplaints(complaints.filter(c => c.id !== deleteModal.complaintId));
      setDeleteModal({ isOpen: false });
    }
  };

  const handleSubmit = (data: ComplaintFormData) => {
    if (modalState.mode === 'create') {
      const newComplaint: Complaint = {
        ...data,
        id: Date.now().toString(),
        unitNumber: `${data.wing}${data.unit}`,
        date: new Date().toISOString().split('T')[0]
      };
      setComplaints([...complaints, newComplaint]);
    } else if (modalState.mode === 'edit' && modalState.data) {
      setComplaints(complaints.map(c => 
        c.id === (modalState.data as Complaint).id 
          ? { ...c, ...data, unitNumber: `${data.wing}${data.unit}` }
          : c
      ));
    }
    setModalState({ isOpen: false, mode: 'create' });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h2 className="text-lg font-semibold">Create Complaint</h2>
        <button
          onClick={() => setModalState({ isOpen: true, mode: 'create' })}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Create Complaint
        </button>
      </div>

      <ComplaintTable
        complaints={complaints}
        onView={handleViewComplaint}
        onEdit={handleEditComplaint}
        onDelete={handleDeleteComplaint}
      />

      <ComplaintModal
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
    </div>
  );
}
