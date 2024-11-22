import React from 'react';
import { Calendar, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import { Facility } from '../../types/facility';

interface FacilityCardProps {
  facility: Facility;
  onEdit: (facility: Facility) => void;
  onDelete: (facility: Facility) => void;
}

export default function FacilityCard({ facility, onEdit, onDelete }: FacilityCardProps) {
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
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{facility.name}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(facility)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Pencil className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => onDelete(facility)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Type: {facility.type}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(facility.status)}`}>
            {facility.status}
          </span>
        </div>
        
        <div className="text-sm text-gray-600">
          Location: {facility.location}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Last: {facility.lastMaintenance}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Next: {facility.nextMaintenance}</span>
          </div>
        </div>
      </div>
    </div>
  );
}