import { useState } from 'react';
import { AnnouncementCard } from './components/announcements/AnnouncementCard';
import { AnnouncementForm } from './components/announcements/AnnouncementForm';
import { Button } from './components/ui/Button';
import type { Announcement } from './types/announcement';

function App() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | undefined>();

  const handleSubmit = (data: Omit<Announcement, 'id'>) => {
    if (editingAnnouncement) {
      setAnnouncements(prev =>
        prev.map(a =>
          a.id === editingAnnouncement.id ? { ...data, id: a.id } : a
        )
      );
    } else {
      setAnnouncements(prev => [
        ...prev,
        { ...data, id: Math.random().toString(36).substr(2, 9) }
      ]);
    }
    handleCloseForm();
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAnnouncement(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium">Announcement</h1>
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Create Announcement
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {announcements.map(announcement => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onEdit={handleEdit}
            />
          ))}
        </div>

        {isFormOpen && (
          <AnnouncementForm
            announcement={editingAnnouncement}
            onSubmit={handleSubmit}
            onCancel={handleCloseForm}
          />
        )}
      </div>
    </div>
  );
}

export default App;