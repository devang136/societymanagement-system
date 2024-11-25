import { useState } from 'react';

import { Header } from './Header';
import { SecurityTable } from './SecurityTable';
import { SecurityModal } from './SecurityModal';
import { DeleteModal } from './DeleteModal';
import { ViewModal } from './ViewModal';
import { SecurityGuard } from './types';
import React from 'react';

const MOCK_USER = {
  name: 'Moni Roy',
  role: 'Admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

const INITIAL_GUARDS: SecurityGuard[] = [
  {
    id: '1',
    name: 'Brooklyn Simmons',
    phone: '94564 96321',
    shift: 'Day',
    date: '10/02/2024',
    time: '2:45 PM',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  // Add more mock data as needed
];

function App() {
  const [guards, setGuards] = useState<SecurityGuard[]>(INITIAL_GUARDS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedGuard, setSelectedGuard] = useState<SecurityGuard | null>(null);

  const handleAdd = (data: Omit<SecurityGuard, 'id'>) => {
    const newGuard = {
      ...data,
      id: Math.random().toString(36).substr(2, 9)
    };
    setGuards([...guards, newGuard]);
    setIsAddModalOpen(false);
  };

  const handleEdit = (data: Omit<SecurityGuard, 'id'>) => {
    if (!selectedGuard) return;
    const updatedGuards = guards.map(guard =>
      guard.id === selectedGuard.id ? { ...data, id: guard.id } : guard
    );
    setGuards(updatedGuards);
    setIsEditModalOpen(false);
    setSelectedGuard(null);
  };

  const handleDelete = () => {
    if (!selectedGuard) return;
    const updatedGuards = guards.filter(guard => guard.id !== selectedGuard.id);
    setGuards(updatedGuards);
    setIsDeleteModalOpen(false);
    setSelectedGuard(null);
  };

  const handleView = (guard: SecurityGuard) => {
    setSelectedGuard(guard);
    setIsViewModalOpen(true);
  };

  return (
    <div className="p-6">
      <Header user={MOCK_USER} />
      <main>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Security Guard Details</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center space-x-2"
          >
            <span>Add Security</span>
          </button>
        </div>

        <SecurityTable
          guards={guards}
          onEdit={(guard) => {
            setSelectedGuard(guard);
            setIsEditModalOpen(true);
          }}
          onDelete={(guard) => {
            setSelectedGuard(guard);
            setIsDeleteModalOpen(true);
          }}
          onView={handleView}
        />

        <SecurityModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAdd}
          title="Add Security"
        />

        <SecurityModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedGuard(null);
          }}
          onSubmit={handleEdit}
          initialData={selectedGuard || undefined}
          title="Edit Security"
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedGuard(null);
          }}
          onConfirm={handleDelete}
        />

        <ViewModal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedGuard(null);
          }}
          guard={selectedGuard}
        />
      </main>
    </div>
  );
}

export default App;