import React from 'react';

interface Protocol {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  protocol?: Protocol;
}

const ViewModal: React.FC<ViewModalProps> = ({
  isOpen,
  onClose,
  protocol
}) => {
  if (!isOpen || !protocol) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">View Protocol</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Title</label>
            <p className="mt-1 text-gray-900">{protocol.title}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <p className="mt-1 text-gray-900">{protocol.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Date</label>
              <p className="mt-1 text-gray-900">{protocol.date}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Time</label>
              <p className="mt-1 text-gray-900">{protocol.time}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
