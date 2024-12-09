import { useState } from 'react';
import { Complaint } from '../../types';
import { MoreVertical, Trash2 } from 'lucide-react';

interface ComplaintCardProps {
  complaint: Complaint;
  onDelete: (id: string) => void;
}

export function ComplaintCard({ complaint, onDelete }: ComplaintCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(complaint._id || complaint.id || '');
    setShowMenu(false);
    setShowConfirm(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg border mb-4 relative">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium">{complaint.title}</h3>
          <p className="text-sm text-gray-500">
            {new Date(complaint.createdAt || '').toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded ${
            complaint.status === 'Open' ? 'bg-green-100 text-green-800' :
            complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
            complaint.status === 'Resolved' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {complaint.status}
          </span>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-gray-600 relative"
          >
            <MoreVertical size={20} />
            {showMenu && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                <button
                  onClick={() => setShowConfirm(true)}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                >
                  <Trash2 className="mr-2" size={16} />
                  Delete Complaint
                </button>
              </div>
            )}
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3">{complaint.description}</p>
      <div className="flex space-x-4 text-sm text-gray-500">
        <span>Category: {complaint.category}</span>
        <span className={`${
          complaint.priority === 'High' ? 'text-red-500' :
          complaint.priority === 'Medium' ? 'text-orange-500' :
          'text-green-500'
        }`}>
          Priority: {complaint.priority}
        </span>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Complaint</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this complaint? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}