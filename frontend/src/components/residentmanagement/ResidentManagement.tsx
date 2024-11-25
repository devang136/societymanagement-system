// ResidentManagement.tsx
import React, { useState } from 'react';
import { Header } from '../residentmanagement/Header';
import { ResidentTable } from '../residentmanagement/ResidentTable';
import { ResidentForm } from '../residentmanagement/ResidentForm';
import { ResidenceStatusModal } from '../residentmanagement/ResidenceStatusModal';
import { ResidentDetails } from '../residentmanagement/ResidentDetails';
import { DeleteConfirmationModal } from '../residentmanagement/DeleteConfirmationModal';

const ResidentManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [residentType, setResidentType] = useState<'owner' | 'tenant'>('owner');

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setShowForm(false);
  };

  const handleStatusSave = (data: { wing: string; unit: string; status: string }) => {
    console.log('Status updated:', data);
    setShowStatusModal(false);
  };

  const handleDeleteConfirm = () => {
    console.log('Resident deleted');
    setShowDeleteModal(false);
  };

  const handleResidentClick = (resident: any) => {
    setSelectedResident(resident);
  };

  return (
    <div>
      <Header title="Resident Management" />
      <main className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Resident Tenant and Owner Details</h1>
          <button
            onClick={handleAddNew}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center space-x-2"
          >
            <span>Add New Resident details</span>
          </button>
        </div>
        
        {showForm ? (
          <ResidentForm
            type={residentType}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
            onTypeChange={setResidentType}
          />
        ) : (
          <ResidentTable
            onResidentClick={handleResidentClick}
            onStatusChange={() => setShowStatusModal(true)}
            onDelete={() => setShowDeleteModal(true)}
          />
        )}
      </main>

      <ResidenceStatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onSave={handleStatusSave}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        unitNumber={selectedResident?.unitNumber}
      />

      {selectedResident && (
        <ResidentDetails
          type={selectedResident.type}
          resident={selectedResident}
          onClose={() => setSelectedResident(null)}
        />
      )}
    </div>
  );
};

export default ResidentManagement;