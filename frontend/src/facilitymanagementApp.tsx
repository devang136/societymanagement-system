import { FC, useState } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import ResidentTable from '@/components/resident/ResidentTable';
import ResidentForm from '@/components/resident/ResidentForm';
import ResidenceStatusModal from '@/components/resident/ResidenceStatusModal';
import ResidentDetails from '@/components/resident/ResidentDetails';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';

interface Resident {
  id: string;
  name: string;
  unit: string;
  wing: string;
  type: 'owner' | 'tenant';
  status: 'active' | 'inactive';
  contactNumber: string;
  email: string;
}

const App: FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [residentType, setResidentType] = useState<'owner' | 'tenant'>('owner');
  const [activeMenuItem, setActiveMenuItem] = useState('Residents');

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (data: Resident) => {
    console.log('Form submitted:', data);
    setShowForm(false);
  };

  const handleStatusSave = (data: { wing: string; unit: string; status: string }) => {
    console.log('Status updated:', data);
    setShowStatusModal(false);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting resident:', selectedResident);
    setShowDeleteModal(false);
  };

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeMenuItem={activeMenuItem}
        onMenuItemClick={handleMenuItemClick}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Resident Management"
          onCreateClick={handleAddNew}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <ResidentTable
            onStatusClick={() => setShowStatusModal(true)}
            onDeleteClick={(resident: Resident) => {
              setSelectedResident(resident);
              setShowDeleteModal(true);
            }}
            onViewDetails={(resident: Resident) => {
              setSelectedResident(resident);
              setShowForm(true);
            }}
          />
        </main>
      </div>

      {showForm && selectedResident && (
        <ResidentForm
          resident={selectedResident}
          onClose={() => {
            setShowForm(false);
            setSelectedResident(null);
          }}
          onSubmit={handleFormSubmit}
          residentType={residentType}
          setResidentType={setResidentType}
        />
      )}

      {showStatusModal && (
        <ResidenceStatusModal
          onClose={() => setShowStatusModal(false)}
          onSave={handleStatusSave}
        />
      )}

      {showDeleteModal && selectedResident && (
        <DeleteConfirmationModal
          title="Delete Resident"
          message="Are you sure you want to delete this resident? This action cannot be undone."
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {selectedResident && !showForm && (
        <ResidentDetails
          resident={selectedResident}
          onClose={() => setSelectedResident(null)}
        />
      )}
    </div>
  );
}

export default App;