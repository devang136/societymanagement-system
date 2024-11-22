import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Facility } from '../../types/facility';
import FacilityCard from './FacilityCard';
import FacilityModal from './FacilityModal';

export default function FacilityManagement() {
  const [facilities, setFacilities] = useState<Facility[]>([
    {
      id: '1',
      name: 'Swimming Pool',
      type: 'Recreation',
      status: 'Available',
      location: 'Ground Floor',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-02-15',
    },
    {
      id: '2',
      name: 'Gym',
      type: 'Fitness',
      status: 'In Use',
      location: 'Second Floor',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-02-20',
    },
    {
      id: '3',
      name: 'Tennis Court',
      type: 'Sports',
      status: 'Under Maintenance',
      location: 'Outdoor',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-03-01',
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | undefined>();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Available' | 'In Use' | 'Under Maintenance'>('all');

  const filteredFacilities = facilities.filter(facility =>
    (filterStatus === 'all' || facility.status === filterStatus) &&
    (facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     facility.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddFacility = () => {
    setSelectedFacility(undefined);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEditFacility = (facility: Facility) => {
    setSelectedFacility(facility);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteFacility = (facility: Facility) => {
    setFacilities(facilities.filter(f => f.id !== facility.id));
  };

  const handleSubmit = (facility: Facility) => {
    if (modalMode === 'add') {
      const newFacility = {
        ...facility,
        id: Date.now().toString(), // Simple ID generation for demo
      };
      setFacilities([...facilities, newFacility]);
    } else {
      setFacilities(facilities.map(f => 
        f.id === facility.id ? facility : f
      ));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Facility Management</h1>
        <button
          onClick={handleAddFacility}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Facility</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search facilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Status</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map(facility => (
          <FacilityCard
            key={facility.id}
            facility={facility}
            onEdit={handleEditFacility}
            onDelete={handleDeleteFacility}
          />
        ))}
      </div>

      <FacilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        facility={selectedFacility}
        mode={modalMode}
      />
    </div>
  );
}
