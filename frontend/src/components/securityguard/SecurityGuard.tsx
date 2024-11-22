import React, { useState, useEffect } from 'react';
import { getSecurityGuards, createSecurityGuard, updateSecurityGuard, deleteSecurityGuard } from '../../services/api';
import { SecurityGuard } from '../../types';
import SecurityModal from './SecurityModal';
import SecurityTable from './SecurityTable';
import { Header } from '../common/Header';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';
import { Plus } from 'lucide-react';

const SecurityGuardManagement: React.FC = () => {
  const [guards, setGuards] = useState<SecurityGuard[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGuard, setSelectedGuard] = useState<SecurityGuard | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [guardToDelete, setGuardToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGuards();
  }, []);

  const fetchGuards = async () => {
    try {
      const data = await getSecurityGuards();
      setGuards(data);
    } catch (error) {
      console.error('Error fetching guards:', error);
    }
  };

  const handleCreate = async (guardData: Omit<SecurityGuard, 'id'>) => {
    try {
      await createSecurityGuard(guardData);
      fetchGuards();
      setShowModal(false);
    } catch (error) {
      console.error('Error creating guard:', error);
    }
  };

  const handleUpdate = async (id: string, guardData: Partial<SecurityGuard>) => {
    try {
      await updateSecurityGuard(id, guardData);
      fetchGuards();
      setShowModal(false);
      setSelectedGuard(null);
    } catch (error) {
      console.error('Error updating guard:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSecurityGuard(id);
      fetchGuards();
      setShowDeleteModal(false);
      setGuardToDelete(null);
    } catch (error) {
      console.error('Error deleting guard:', error);
    }
  };

  const openEditModal = (guard: SecurityGuard) => {
    setSelectedGuard(guard);
    setShowModal(true);
  };

  const openDeleteModal = (guardId: string) => {
    setGuardToDelete(guardId);
    setShowDeleteModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Duty':
        return 'bg-green-100 text-green-800';
      case 'Off Duty':
        return 'bg-gray-100 text-gray-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredGuards = guards.filter(guard => 
    guard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guard.shift.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guard.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Header
        title="Security Guard Management"
        showSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        actions={
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <Plus size={20} />
            Add New Guard
          </button>
        }
      />

      <SecurityTable
        guards={filteredGuards}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
        getStatusColor={getStatusColor}
      />

      {showModal && (
        <SecurityModal
          guard={selectedGuard}
          onClose={() => {
            setShowModal(false);
            setSelectedGuard(null);
          }}
          onSave={selectedGuard ? (data) => handleUpdate(selectedGuard.id, data) : handleCreate}
        />
      )}

      {showDeleteModal && guardToDelete && (
        <DeleteConfirmationModal
          title="Delete Security Guard"
          message="Are you sure you want to delete this security guard? This action cannot be undone."
          onClose={() => {
            setShowDeleteModal(false);
            setGuardToDelete(null);
          }}
          onConfirm={() => handleDelete(guardToDelete)}
        />
      )}
    </div>
  );
};

export default SecurityGuardManagement;
