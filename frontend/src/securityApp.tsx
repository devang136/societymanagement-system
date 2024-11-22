import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import SecurityTable, { SecurityGuard } from './components/SecurityTable';
import SecurityModal from './components/SecurityModal';
import DeleteModal from './components/DeleteModal';
import ViewModal from './components/ViewModal';

const mockGuards: SecurityGuard[] = [
  {
    id: '1',
    name: 'John Doe',
    shift: 'morning',
    area: 'Main Entrance',
    contact: '+1234567890',
    status: 'active',
    lastCheckIn: '2023-05-20 09:00 AM',
  },
  // Add more mock data as needed
];

const SecurityApp: React.FC = () => {
  const [guards, setGuards] = useState<SecurityGuard[]>(mockGuards);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedGuard, setSelectedGuard] = useState<SecurityGuard | null>(null);

  const handleCreateGuard = (guardData: Omit<SecurityGuard, 'id'>) => {
    const newGuard: SecurityGuard = {
      ...guardData,
      id: Date.now().toString(),
    };
    setGuards([...guards, newGuard]);
    setIsModalOpen(false);
  };

  const handleEditGuard = (guardData: Omit<SecurityGuard, 'id'>) => {
    if (selectedGuard) {
      const updatedGuards = guards.map((guard) =>
        guard.id === selectedGuard.id ? { ...guardData, id: guard.id } : guard
      );
      setGuards(updatedGuards);
      setIsModalOpen(false);
      setSelectedGuard(null);
    }
  };

  const handleDeleteGuard = () => {
    if (selectedGuard) {
      const updatedGuards = guards.filter((guard) => guard.id !== selectedGuard.id);
      setGuards(updatedGuards);
      setIsDeleteModalOpen(false);
      setSelectedGuard(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Security Management"
          onCreateClick={() => setIsModalOpen(true)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <SecurityTable
            guards={guards}
            onEdit={(guard) => {
              setSelectedGuard(guard);
              setIsModalOpen(true);
            }}
            onDelete={(guard) => {
              setSelectedGuard(guard);
              setIsDeleteModalOpen(true);
            }}
            onView={(guard) => {
              setSelectedGuard(guard);
              setIsViewModalOpen(true);
            }}
          />
        </main>
      </div>

      <SecurityModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedGuard(null);
        }}
        onSubmit={selectedGuard ? handleEditGuard : handleCreateGuard}
        initialData={selectedGuard || undefined}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedGuard(null);
        }}
        onConfirm={handleDeleteGuard}
        title="Delete Security Guard"
        message="Are you sure you want to delete this security guard? This action cannot be undone."
      />

      {selectedGuard && (
        <ViewModal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedGuard(null);
          }}
          title="Security Guard Details"
          data={selectedGuard}
        />
      )}
    </div>
  );
};

export default SecurityApp;