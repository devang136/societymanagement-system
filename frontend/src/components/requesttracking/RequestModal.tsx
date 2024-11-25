import React from 'react';
import type { Request, RequestFormData } from '../../types';
import { X } from 'lucide-react';

interface RequestModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit' | 'view';
  data?: RequestFormData;
  onClose: () => void;
  onSubmit: (data: RequestFormData) => void;
}

export function RequestModal({ isOpen, mode, data, onClose, onSubmit }: RequestModalProps) {
  if (!isOpen) return null;

  const title = mode === 'create' ? 'Create Request' : mode === 'edit' ? 'Edit Request' : 'View Request';
  const isView = mode === 'view';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as unknown as RequestFormData;
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requester Name*
            </label>
            <input
              type="text"
              name="requesterName"
              defaultValue={data?.requesterName}
              required
              disabled={isView}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Request Name*
            </label>
            <input
              type="text"
              name="requestName"
              defaultValue={data?.requestName}
              required
              disabled={isView}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              name="description"
              defaultValue={data?.description}
              required
              disabled={isView}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wing*
              </label>
              <input
                type="text"
                name="wing"
                defaultValue={data?.wing}
                required
                disabled={isView}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit*
              </label>
              <input
                type="text"
                name="unit"
                defaultValue={data?.unit}
                required
                disabled={isView}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority*
            </label>
            <div className="flex gap-4">
              {['High', 'Medium', 'Low'].map((priority) => (
                <label key={priority} className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    defaultChecked={data?.priority === priority}
                    disabled={isView}
                    required
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500 disabled:opacity-50"
                  />
                  <span className="ml-2">{priority}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status*
            </label>
            <div className="flex gap-4">
              {['Open', 'Pending', 'Solve'].map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    defaultChecked={data?.status === status}
                    disabled={isView}
                    required
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500 disabled:opacity-50"
                  />
                  <span className="ml-2">{status}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            {!isView && (
              <button
                type="submit"
                className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
              >
                {mode === 'create' ? 'Create' : 'Save'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 