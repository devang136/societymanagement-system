import type { Announcement } from '../../types/announcement';

interface AnnouncementCardProps {
  announcement: Announcement;
  onEdit: (announcement: Announcement) => void;
}

export function AnnouncementCard({ announcement, onEdit }: AnnouncementCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 space-y-2">
      <div className="flex justify-between items-start">
        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
          {announcement.category}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(announcement)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onEdit(announcement)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            View
          </button>
          <button
            onClick={() => onEdit(announcement)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-gray-500">
          <div>Announcement Date: {announcement.date}</div>
          <div>Announcement Time: {announcement.time}</div>
        </div>
        <div className="text-sm">
          <div>Description</div>
          <p className="text-gray-700">{announcement.description}</p>
        </div>
      </div>
    </div>
  );
}