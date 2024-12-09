import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import EventsTabs from './components/events/EventsTabs';
import EventsTable from './components/events/EventsTable';
import { Event } from '../../../services/eventService';
import { eventsService } from '../../../services/eventsService';
import toast from 'react-hot-toast';

interface Activity extends Event {
  participantCount: number;
}

const MOCK_USER = {
  name: 'Moni Roy',
  role: 'User',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

function App() {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (activeTab === 'events') {
          const eventsData = await eventsService.getEvents();
          setEvents(eventsData.map((event: any) => ({
            ...event,
            category: event.category || 'General',
            maxParticipants: event.maxParticipants || 100,
            participants: event.participants || [],
            createdAt: event.createdAt || new Date().toISOString(),
            updatedAt: event.updatedAt || new Date().toISOString()
          })));
        } else {
          const eventsData = await eventsService.getEvents();
          const activitiesData = eventsData.map((event: any) => ({
            ...event,
            category: event.category || 'General',
            maxParticipants: event.maxParticipants || 100,
            participants: event.participants || [],
            createdAt: event.createdAt || new Date().toISOString(),
            updatedAt: event.updatedAt || new Date().toISOString(),
            participantCount: 0
          }));
          setActivities(activitiesData);
        }
      } catch (error) {
        toast.error('Failed to load events data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        <Header user={MOCK_USER} />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Events Participation</h1>
          </div>
          
          <EventsTabs
            tabs={[
              { id: 'events', label: 'Events Participate' },
              { id: 'activity', label: 'Activity Participate' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <div className="mt-6">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <EventsTable 
                events={activeTab === 'events' ? events : activities}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;