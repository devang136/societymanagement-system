import React from 'react';

interface NoteCardProps {
  id?: string;
  title: string;
  description: string;
  onEdit: () => void;
  onDelete?: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ 
  title, 
  description, 
  onEdit,
  onDelete 
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <p className="text-gray-600 mb-3">{description}</p>
    </div>
  );
};

export default NoteCard;
