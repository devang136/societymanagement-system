import React, { useState } from 'react';
import { Button } from '../ui/Button';
import type { Announcement } from '../../types/announcement';

interface AnnouncementFormProps {
  announcement?: Announcement;
  onSubmit: (data: Omit<Announcement, 'id'>) => void;
  onCancel: () => void;
}

export function AnnouncementForm({ announcement, onSubmit, onCancel }: AnnouncementFormProps) {
  const [formData, setFormData] = useState({
    title: announcement?.title || '',
    description: announcement?.description || '',
    date: announcement?.date || '',
    time: announcement?.time || '',
    category: announcement?.category || 'Community Initiatives'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">
            {announcement ? 'Edit Announcement' : 'Add Announcement'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm mb-1">
              Announcement Title*
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Description*
            </label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Description"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">
                Announcement Date*
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">
                Announcement Time*
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={e => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
            <Button 
              variant="secondary" 
              type="button" 
              onClick={onCancel}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}