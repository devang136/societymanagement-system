import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FacilityCard from './components/FacilityCard';
import FacilityModal from './components/FacilityModal';
import { Plus } from 'lucide-react';
import { Facility, FacilityFormData } from './types/facility';

const initialFacilities: Facility[] = [
  {
    id: '1',
    title: 'Parking Facilities',
    date: '2024-01-07',
    description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in...'
  },
  {
    id: '2',
    title: 'Community Center',
    date: '2024-01-07',
    description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in...'
  },
  {
    id: '3',
    title: 'Swimming Pool',
    date: '2024-01-07',
    description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in...'
  },
  {
    id: '4',
    title: 'Parks and Green Spaces',
    date: '2024-01-07',
    description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in...'
  },
  {
    id: '5',
    title: 'Wi-Fi and Connectivity',
    date: '2024-01-07',
    description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in...'
  },
  {
    id: '6',
    title: 'Pet-Friendly Facilities',
    date: '2024-01-07',
    description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in...'
  }
];

function App() {
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | undefined>();

  const handleEdit = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsModalOpen(true);
  };

  const handleSubmit = (formData: FacilityFormData) => {
    if (selectedFacility) {
      // Update existing facility
      setFacilities(facilities.map(facility => 
        facility.id === selectedFacility.id 
          ? { ...facility, ...formData }
          : facility
      ));
    } else {
      // Create new facility
      const newFacility: Facility = {
        id: String(Date.now()),
        ...formData
      };
      setFacilities([...facilities, newFacility]);
    }
    setSelectedFacility(undefined);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedFacility(undefined);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Facility Management</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <Plus className="w-5 h-5" />
              <span>Create Facility</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </main>
      </div>

      <FacilityModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        facility={selectedFacility}
      />
    </div>
  );
}

export default App;