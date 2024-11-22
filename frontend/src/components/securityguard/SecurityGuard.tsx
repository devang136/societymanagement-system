import React, { useState, useEffect } from 'react';
import { getSecurityGuards, createSecurityGuard, updateSecurityGuard, deleteSecurityGuard } from '../../services/api';
import { SecurityGuard } from '../../types';
import SecurityModal from './SecurityModal';
import SecurityTable from './SecurityTable';
import { Header } from './Header';

const SecurityGuardManagement: React.FC = () => {
  const [guards, setGuards] = useState<SecurityGuard[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGuard, setSelectedGuard] = useState<SecurityGuard | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'On Duty' | 'Off Duty' | 'On Leave'>('all');
  const [filterShift, setFilterShift] = useState<'all' | 'Morning' | 'Afternoon' | 'Night'>('all');

  useEffect(() => {
    fetchGuards();
  }, []);

  const fetchGuards = async () => {
    try {
      const data = await getSecurityGuards();
      setGuards(data);
    } catch (error) {
      console.error('Error fetching security guards:', error);
    }
  };

  const handleAddGuard = async (guardData: Omit<SecurityGuard, 'id'>) => {
    try {
      await createSecurityGuard(guardData);
      fetchGuards();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding security guard:', error);
    }
  };

  const handleEditGuard = async (id: string, guardData: Partial<SecurityGuard>) => {
    try {
      await updateSecurityGuard(id, guardData);
      fetchGuards();
      setShowModal(false);
      setSelectedGuard(null);
    } catch (error) {
      console.error('Error updating security guard:', error);
    }
  };

  const handleDeleteGuard = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this guard?')) {
      try {
        await deleteSecurityGuard(id);
        fetchGuards();
      } catch (error) {
        console.error('Error deleting security guard:', error);
      }
    }
  };

  const filteredGuards = guards.filter(guard =>
    (filterStatus === 'all' || guard.status === filterStatus) &&
    (filterShift === 'all' || guard.shift === filterShift) &&
    (guard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     guard.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     guard.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  return (
    <div className="p-6">
      <Header
        onAddNew={() => {
          setSelectedGuard(null);
          setShowModal(true);
        }}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <SecurityTable
        guards={filteredGuards}
        onEdit={(guard) => {
          setSelectedGuard(guard);
          setShowModal(true);
        }}
        onDelete={handleDeleteGuard}
        getStatusColor={getStatusColor}
      />

      {showModal && (
        <SecurityModal
          guard={selectedGuard}
          onClose={() => {
            setShowModal(false);
            setSelectedGuard(null);
          }}
          onSave={selectedGuard ? 
            (guardData) => handleEditGuard(selectedGuard.id, guardData) : 
            handleAddGuard
          }
        />
      )}
    </div>
  );
};

export default SecurityGuardManagement;
