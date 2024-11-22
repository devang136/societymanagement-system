import React from 'react';
import { Facility } from '@/types/facility';
import FacilityCard from './FacilityCard';

interface FacilityListProps {
  facilities: Facility[];
  onEditFacility: (facility: Facility) => void;
}

const FacilityList: React.FC<FacilityListProps> = ({ facilities, onEditFacility }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {facilities.map((facility) => (
        <FacilityCard
          key={facility.id}
          facility={facility}
          onEdit={() => onEditFacility(facility)}
        />
      ))}
      {facilities.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500">
          No facilities found.
        </div>
      )}
    </div>
  );
};

export default FacilityList;
