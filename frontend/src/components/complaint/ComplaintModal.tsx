import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { ComplaintFormData } from '@/types/complaint';

interface ComplaintModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit' | 'view';
  data?: ComplaintFormData;
  onClose: () => void;
  onSubmit: (data: ComplaintFormData) => void;
}

const ComplaintModal: React.FC<ComplaintModalProps> = ({
  isOpen,
  mode,
  data,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ComplaintFormData>({
    complainerName: '',
    complaintName: '',
    description: '',
    unitNumber: '',
    wing: 'A',
    priority: 'Medium',
    status: 'New',
    category: 'General'
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  const isViewMode = mode === 'view';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {mode === 'create' ? 'Create' : mode === 'edit' ? 'Edit' : 'View'} Complaint
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Complainer Name
              </label>
              <input
                type="text"
                value={formData.complainerName}
                onChange={(e) =>
                  setFormData({ ...formData, complainerName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isViewMode}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Complaint Name
              </label>
              <input
                type="text"
                value={formData.complaintName}
                onChange={(e) =>
                  setFormData({ ...formData, complaintName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isViewMode}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
                disabled={isViewMode}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Number
                </label>
                <input
                  type="text"
                  value={formData.unitNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, unitNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={isViewMode}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wing
                </label>
                <select
                  value={formData.wing}
                  onChange={(e) =>
                    setFormData({ ...formData, wing: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={isViewMode}
                >
                  <option value="A">Wing A</option>
                  <option value="B">Wing B</option>
                  <option value="C">Wing C</option>
                  <option value="D">Wing D</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isViewMode}
              >
                <option value="General">General</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Security">Security</option>
                <option value="Noise">Noise</option>
                <option value="Behavior">Behavior</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as 'High' | 'Medium' | 'Low',
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={isViewMode}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as 'New' | 'In Progress' | 'Resolved',
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={isViewMode}
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              {isViewMode ? 'Close' : 'Cancel'}
            </button>
            {!isViewMode && (
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {mode === 'create' ? 'Create' : 'Update'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintModal;
