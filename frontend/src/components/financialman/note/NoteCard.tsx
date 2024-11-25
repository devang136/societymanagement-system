import React from 'react';
import { Edit } from 'lucide-react';

interface NoteCardProps {
  title: string;
  description: string;
  onEdit?: () => void;
}

export default function NoteCard({ title, description, onEdit }: NoteCardProps) {
  return (
    <div className="bg-[#4169E1] text-white rounded-lg p-4 relative">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
}