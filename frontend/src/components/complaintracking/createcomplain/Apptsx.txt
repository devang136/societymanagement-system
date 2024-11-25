import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ComplaintTable } from './components/ComplaintTable';
import { ComplaintModal } from './components/ComplaintModal';
import { DeleteModal } from './components/DeleteModal';
import type { Complaint, ComplaintFormData } from './types';
import { Bell } from 'lucide-react';

const initialComplaints: Complaint[] = [
  {
    id: '1001',
    complainerName: 'Evelyn Harper',
    complaintName: 'Unethical Behavior',
    description: 'Providing false information or deliberately.',
    unitNumber: 'A1001',
    priority: 'Medium',
    status: 'Pending',
    date: '2024-03-15',
    wing: 'A',
    unit: '1001'
  },
  {
    id: '1002',
    complainerName: 'Esther Howard',
    complaintName: 'Preventive Measures',
    description: 'Regular waste collection services.',
    unitNumber: 'B1002',
    priority: 'Low',
    status: 'Open',
    date: '2024-03-14',
    wing: 'B',
    unit: '1002'
  },
  {
    id: '1003',
    complainerName: 'Jenny Wilson',
    complaintName: 'Unethical Behavior',
    description: 'Designated garages for residents and guests.',
    unitNumber: 'C1003',
    priority: 'High',
    status: 'Solve',
    date: '2024-03-13',
    wing: 'C',
    unit: '1003'
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
        id: Math.random().toString(36).substr(2, 9),
        unitNumber: `${data.wing}${data.unit}`,
        date: new Date().toISOString().split('T')[0]
      };
      setComplaints([...complaints, newComplaint]);
    } else if (modalState.mode === 'edit' && modalState.data) {
      setComplaints(
        complaints.map(c =>
          c.id === modalState.data?.id
            ? { ...c, ...data, unitNumber: `${data.wing}${data.unit}` }
            : c
        )
      );
    }
    setModalState({ isOpen: false, mode: 'create' });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1">
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Create Complaint</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
              </button>
              <div className="flex items-center gap-2">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Moni"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium">Moni Roy</p>
                  <p className="text-sm text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-lg font-semibold">Create Complaint</h2>
            <button
              onClick={handleCreateComplaint}
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
            initialData={modalState.data}
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
    </div>
  );
}

export default App;