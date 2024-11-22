import React from 'react';
import { Facility } from '@/types/facility';
import { Calendar, MapPin, Tool, Activity } from 'lucide-react';

interface FacilityCardProps {
  facility: Facility;
  onEdit: () => void;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ facility, onEdit }) => {
  const getStatusColor = (status: Facility['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'In Use':
        return 'bg-blue-100 text-blue-800';
      case 'Under Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{facility.name}</h3>
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(facility.status)}`}>
          {facility.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Activity className="w-5 h-5 mr-2" />
          <span>{facility.type}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{facility.location}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-2" />
          <span>Last Maintenance: {facility.lastMaintenance}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Tool className="w-5 h-5 mr-2" />
          <span>Next Maintenance: {facility.nextMaintenance}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={onEdit}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Edit Facility
        </button>
      </div>
    </div>
  );
};

export default FacilityCard;
