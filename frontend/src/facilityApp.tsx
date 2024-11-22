import { FC, useState } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import FacilityList from '@/components/facility/FacilityList';
import FacilityModal from '@/components/facility/FacilityModal';
import { Facility, FacilityFormData } from '@/types/facility';

const initialFacilities: Facility[] = [
  {
    id: '1',
    name: 'Parking Facilities',
    type: 'Parking',
    status: 'Available',
    location: 'Block A',
    lastMaintenance: '2024-01-01',
    nextMaintenance: '2024-04-01'
  },
  {
    id: '2',
    name: 'Community Center',
    type: 'Recreation',
    status: 'Available',
    location: 'Central Block',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15'
  },
  {
    id: '3',
    name: 'Swimming Pool',
    type: 'Recreation',
    status: 'Under Maintenance',
    location: 'Block B',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-05-01'
  },
  {
    id: '4',
    name: 'Parks and Green Spaces',
    type: 'Recreation',
    status: 'Available',
    location: 'Multiple Locations',
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-04-20'
  },
  {
    id: '5',
    name: 'Wi-Fi and Connectivity',
    type: 'Infrastructure',
    status: 'Available',
    location: 'All Blocks',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-05-01'
  },
  {
    id: '6',
    name: 'Pet-Friendly Area',
    type: 'Recreation',
    status: 'Available',
    location: 'Block C',
    lastMaintenance: '2024-01-25',
    nextMaintenance: '2024-04-25'
  }
];

const App: FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | undefined>();
  const [activeMenuItem, setActiveMenuItem] = useState('Facilities');

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
    setIsModalOpen(false);
    setSelectedFacility(undefined);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedFacility(undefined);
  };

  const handleCreateClick = () => {
    setSelectedFacility(undefined);
    setIsModalOpen(true);
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
          title="Facility Management"
          onCreateClick={handleCreateClick}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <FacilityList
            facilities={facilities}
            onEditFacility={handleEdit}
          />
        </main>
      </div>
      {isModalOpen && (
        <FacilityModal
          facility={selectedFacility}
          onClose={handleModalClose}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default App;