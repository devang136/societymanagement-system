import React, { useState } from 'react';
import Header from './Header';
import FacilityCard from './FacilityCard';
import FacilityModal from './FacilityModal';
import { Facility, FacilityFormData } from '../types/facility';
import { MOCK_FACILITIES } from '../data/mockData';

export default function FacilityManagement() {
  const [facilities, setFacilities] = useState<Facility[]>(MOCK_FACILITIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const handleCreateFacility = () => {
    setSelectedFacility(null);
    setIsModalOpen(true);
  };

  const handleEditFacility = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: FacilityFormData) => {
    if (selectedFacility) {
      // Edit existing facility
      setFacilities(facilities.map(f => 
        f.id === selectedFacility.id 
          ? { ...f, ...data }
          : f
      ));
    } else {
      // Create new facility
      const newFacility: Facility = {
        id: Date.now().toString(),
        ...data
      };
      setFacilities([...facilities, newFacility]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Facility Management</h1>
          <button
            onClick={handleCreateFacility}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Create Facility
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              onEdit={handleEditFacility}
            />
          ))}
        </div>
      </main>

      <FacilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        facility={selectedFacility || undefined}
      />
    </div>
  );
} 