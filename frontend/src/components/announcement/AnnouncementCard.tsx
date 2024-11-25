import React from 'react';
import { Edit2, Eye } from 'lucide-react';
import { Announcement } from './announcement';
import { format } from 'date-fns';

interface AnnouncementCardProps {
  announcement: Announcement;
  onEdit: (announcement: Announcement) => void;
  onView: (announcement: Announcement) => void;
}

export default function AnnouncementCard({ 
  announcement, 
  onEdit,
  onView 
}: AnnouncementCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm text-gray-500">Announcement Date</p>
          <p className="font-medium">{format(new Date(announcement.date), 'MM/dd/yyyy')}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onView(announcement)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="View announcement"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onEdit(announcement)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Edit announcement"
          >
            <Edit2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div>
        <p className="text-sm text-gray-500">Announcement Time</p>
        <p className="font-medium">{announcement.time}</p>
      </div>
      
      <div className="mt-3">
        <p className="text-sm text-gray-500">Description</p>
        <p className="text-sm mt-1 line-clamp-2">{announcement.description}</p>
      </div>
    </div>
  );
}