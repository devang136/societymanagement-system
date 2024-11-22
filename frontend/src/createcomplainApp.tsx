import { useState } from 'react';
import Sidebar from '@/components/common/Sidebar';
import ComplaintTable from '@/components/complaint/ComplaintTable';
import ComplaintModal from '@/components/complaint/ComplaintModal';
import DeleteModal from '@/components/complaint/DeleteModal';
import type { Complaint, ComplaintFormData } from '@/types/complaint';
import { Bell } from 'lucide-react';

const initialComplaints: Complaint[] = [
  {
    id: '1001',
    complainerName: 'Evelyn Harper',
    complaintName: 'Unethical Behavior',
    description: 'Providing false information or deliberately.',
    unitNumber: 'A1001',
    wing: 'A',
    priority: 'High',
    status: 'New',
    dateSubmitted: '2024-03-15',
    category: 'Behavior'
  },
  {
    id: '1002',
    complainerName: 'Esther Howard',
    complaintName: 'Preventive Measures',
    description: 'Regular waste collection services.',
    unitNumber: 'B1002',
    wing: 'B',
    priority: 'Low',
    status: 'In Progress',
    dateSubmitted: '2024-03-14',
    category: 'Maintenance'
  },
  {
    id: '1003',
    complainerName: 'Jenny Wilson',
    complaintName: 'Unethical Behavior',
    description: 'Designated garages for residents and guests.',
    unitNumber: 'C1003',
    wing: 'C',
    priority: 'High',
    status: 'Resolved',
    dateSubmitted: '2024-03-13',
    category: 'Behavior'
  }
];

function App() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
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
  const [activeMenuItem, setActiveMenuItem] = useState('Complaints');

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
      data: {
        complainerName: complaint.complainerName,
        complaintName: complaint.complaintName,
        description: complaint.description,
        unitNumber: complaint.unitNumber,
        wing: complaint.wing,
        priority: complaint.priority,
        status: complaint.status,
        category: complaint.category
      }
    });
  };

  const handleEditComplaint = (complaint: Complaint) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      data: {
        complainerName: complaint.complainerName,
        complaintName: complaint.complaintName,
        description: complaint.description,
        unitNumber: complaint.unitNumber,
        wing: complaint.wing,
        priority: complaint.priority,
        status: complaint.status,
        category: complaint.category
      }
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

  const handleSubmitComplaint = (data: ComplaintFormData) => {
    if (modalState.mode === 'create') {
      const newComplaint: Complaint = {
        id: String(Date.now()),
        ...data,
        dateSubmitted: new Date().toISOString().split('T')[0]
      };
      setComplaints([newComplaint, ...complaints]);
    } else if (modalState.mode === 'edit' && modalState.data) {
      setComplaints(
        complaints.map(c =>
          c.id === modalState.data?.id
            ? { ...c, ...data }
            : c
        )
      );
    }
    setModalState({ isOpen: false, mode: 'create' });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        activeMenuItem={activeMenuItem}
        onMenuItemClick={setActiveMenuItem}
      />
      
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <h1 className="text-xl font-semibold text-gray-900">Complaint Management</h1>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Bell className="h-6 w-6" />
                </button>
                <button
                  onClick={handleCreateComplaint}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Create Complaint
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <ComplaintTable
            complaints={complaints}
            onView={handleViewComplaint}
            onEdit={handleEditComplaint}
            onDelete={handleDeleteComplaint}
          />
        </main>
      </div>

      {modalState.isOpen && (
        <ComplaintModal
          isOpen={modalState.isOpen}
          mode={modalState.mode}
          data={modalState.data}
          onClose={() => setModalState({ isOpen: false, mode: 'create' })}
          onSubmit={handleSubmitComplaint}
        />
      )}

      {deleteModal.isOpen && (
        <DeleteModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false })}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default App;