import { useState } from 'react';
import { Announcement as AnnouncementType } from '../../types/announcement';
import AnnouncementCard from './AnnouncementCard';
import AnnouncementModal from './AnnouncementModal';
import ViewAnnouncementModal from './ViewAnnouncementModal';

const Announcement = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([
    {
      id: '1',
      title: 'Monthly Maintenance Schedule',
      content: 'Building maintenance will be carried out on March 20th, 2024. Please expect some noise between 10 AM and 4 PM.',
      category: 'Maintenance',
      priority: 'High',
      status: 'Active',
      createdAt: '2024-03-15',
      validUntil: '2024-03-21',
      createdBy: 'Admin',
      targetAudience: ['All Residents', 'Staff'],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Active' | 'Scheduled' | 'Expired'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'High' | 'Medium' | 'Low'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementType | undefined>();

  const filteredAnnouncements = announcements.filter(announcement =>
    (filterStatus === 'all' || announcement.status === filterStatus) &&
    (filterPriority === 'all' || announcement.priority === filterPriority) &&
    (announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     announcement.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddAnnouncement = (newAnnouncement: Omit<AnnouncementType, 'id' | 'createdAt' | 'createdBy'>) => {
    const announcement: AnnouncementType = {
      ...newAnnouncement,
      id: (announcements.length + 1).toString(),
      createdAt: new Date().toISOString(),
      createdBy: 'Admin',
    };
    setAnnouncements([...announcements, announcement]);
    setIsAddModalOpen(false);
  };

  const handleEditAnnouncement = (announcement: AnnouncementType) => {
    setSelectedAnnouncement(announcement);
    setIsAddModalOpen(true);
  };

  const handleViewAnnouncement = (announcement: AnnouncementType) => {
    setSelectedAnnouncement(announcement);
    setIsViewModalOpen(true);
  };

  const handleUpdateAnnouncement = (updatedData: Omit<AnnouncementType, 'id' | 'createdAt' | 'createdBy'>) => {
    if (!selectedAnnouncement) return;

    const updatedAnnouncement: AnnouncementType = {
      ...updatedData,
      id: selectedAnnouncement.id,
      createdAt: selectedAnnouncement.createdAt,
      createdBy: selectedAnnouncement.createdBy,
    };

    setAnnouncements(announcements.map(a => 
      a.id === selectedAnnouncement.id ? updatedAnnouncement : a
    ));
    setIsAddModalOpen(false);
    setSelectedAnnouncement(undefined);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Announcements</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Create Announcement
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'Active' | 'Scheduled' | 'Expired')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Expired">Expired</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as 'all' | 'High' | 'Medium' | 'Low')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            onEdit={handleEditAnnouncement}
            onView={handleViewAnnouncement}
          />
        ))}
      </div>

      <AnnouncementModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedAnnouncement(undefined);
        }}
        onSubmit={selectedAnnouncement ? handleUpdateAnnouncement : handleAddAnnouncement}
        announcement={selectedAnnouncement}
      />

      <ViewAnnouncementModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedAnnouncement(undefined);
        }}
        announcement={selectedAnnouncement}
      />
    </div>
  );
};

export default Announcement;
