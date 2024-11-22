import { useState } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import AnnouncementCard from '@/components/announcement/AnnouncementCard';
import AnnouncementModal from '@/components/announcement/AnnouncementModal';
import ViewAnnouncementModal from '@/components/announcement/ViewAnnouncementModal';
import { Announcement, AnnouncementFormData } from '@/types/announcement';

const initialAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Community Initiatives',
    content: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in homes.',
    category: 'Community Initiatives',
    priority: 'High',
    status: 'Active',
    createdAt: new Date().toISOString(),
    validUntil: '2024-12-31',
    createdBy: 'Admin',
    targetAudience: ['All Residents']
  },
  {
    id: '2',
    title: 'Community Initiatives',
    content: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in homes.',
    category: 'Community Initiatives',
    priority: 'Medium',
    status: 'Active',
    createdAt: new Date().toISOString(),
    validUntil: '2024-12-31',
    createdBy: 'Admin',
    targetAudience: ['All Residents']
  },
  {
    id: '3',
    title: 'Community Initiatives',
    content: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in homes.',
    category: 'Community Initiatives',
    priority: 'Low',
    status: 'Active',
    createdAt: new Date().toISOString(),
    validUntil: '2024-12-31',
    createdBy: 'Admin',
    targetAudience: ['All Residents']
  }
];

function App() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | undefined>();
  const [viewingAnnouncement, setViewingAnnouncement] = useState<Announcement | undefined>();
  const [activeMenuItem, setActiveMenuItem] = useState('Announcements');

  const handleCreateOrEdit = (formData: AnnouncementFormData) => {
    if (selectedAnnouncement) {
      // Edit existing announcement
      setAnnouncements(announcements.map(ann => 
        ann.id === selectedAnnouncement.id
          ? { 
              ...ann, 
              ...formData,
              createdAt: ann.createdAt,
              createdBy: ann.createdBy
            }
          : ann
      ));
    } else {
      // Create new announcement
      const newAnnouncement: Announcement = {
        id: String(Date.now()),
        ...formData,
        createdAt: new Date().toISOString(),
        createdBy: 'Admin'
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAnnouncement(undefined);
  };

  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleView = (announcement: Announcement) => {
    setViewingAnnouncement(announcement);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingAnnouncement(undefined);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        activeMenuItem={activeMenuItem}
        onMenuItemClick={setActiveMenuItem}
      />
      
      <div className="flex-1">
        <Header 
          title="Announcements"
          onCreateClick={() => setIsModalOpen(true)} 
        />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Announcement</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onEdit={handleEdit}
                onView={handleView}
              />
            ))}
          </div>
        </main>
      </div>

      {isModalOpen && (
        <AnnouncementModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleCreateOrEdit}
          announcement={selectedAnnouncement}
        />
      )}

      {isViewModalOpen && viewingAnnouncement && (
        <ViewAnnouncementModal
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
          announcement={viewingAnnouncement}
        />
      )}
    </div>
  );
}

export default App;