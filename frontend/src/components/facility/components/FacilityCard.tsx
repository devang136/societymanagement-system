import React from 'react';
import { Calendar, ChevronRight, Pencil } from 'lucide-react';
import { Facility } from '../types/facility';

interface FacilityCardProps {
  facility: Facility;
  onEdit: (facility: Facility) => void;
}

export default function FacilityCard({ facility, onEdit }: FacilityCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{facility.title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(facility)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Pencil className="w-4 h-4 text-gray-500" />
          </button>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Upcoming Schedule Service Date: {facility.date}</span>
        </div>
        
        <p className="text-sm text-gray-600">
          Description:
          <br />
          {facility.description}
        </p>
      </div>
    </div>
  );
}