import { X } from 'lucide-react';
import { Announcement } from '../../types/announcement';
import { format } from 'date-fns';

interface ViewAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcement?: Announcement;
}

export default function ViewAnnouncementModal({
  isOpen,
  onClose,
  announcement,
}: ViewAnnouncementModalProps) {
  if (!isOpen || !announcement) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{announcement.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
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
            <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
              {announcement.category}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500">Content</p>
            <p className="mt-1">{announcement.content}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Created On</p>
              <p className="font-medium">
                {format(new Date(announcement.createdAt), 'MMM dd, yyyy')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Valid Until</p>
              <p className="font-medium">
                {format(new Date(announcement.validUntil), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Target Audience</p>
            <div className="mt-2 flex flex-wrap gap-2">
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

          <div>
            <p className="text-sm text-gray-500">Created By</p>
            <p className="font-medium">{announcement.createdBy}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}