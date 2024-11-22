import React from 'react';
import { Edit2, Eye } from 'lucide-react';
import { Announcement } from '../../types/announcement';
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
          <div className="flex space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              announcement.priority === 'High' ? 'bg-red-100 text-red-800' :
              announcement.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {announcement.priority}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              announcement.status === 'Active' ? 'bg-green-100 text-green-800' :
              announcement.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {announcement.status}
            </span>
          </div>
          <p className="text-sm text-gray-500">Created On</p>
          <p className="font-medium">{format(new Date(announcement.createdAt), 'MMM dd, yyyy')}</p>
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
        <h3 className="font-medium text-lg mb-2">{announcement.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
      </div>
      
      <div className="mt-3">
        <p className="text-sm text-gray-500 mb-1">Valid Until</p>
        <p className="text-sm font-medium">{format(new Date(announcement.validUntil), 'MMM dd, yyyy')}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {announcement.targetAudience.map((audience, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs"
          >
            {audience}
          </span>
        ))}
      </div>
    </div>
  );
}