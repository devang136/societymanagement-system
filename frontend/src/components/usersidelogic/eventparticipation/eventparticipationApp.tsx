import React, { useState } from 'react';
import Header from './components/layout/Header';
import EventsTabs from './components/events/EventsTabs';
import EventsTable from './components/events/EventsTable';

const MOCK_USER = {
  name: 'Moni Roy',
  role: 'Admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const MOCK_EVENTS = [
  {
    id: '1',
    participator: {
      name: 'Cody Fisher',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    description: 'Event and recreational activities.',
    activityTime: '2:45 PM',
    activityDate: '2024-02-11',
    activityName: 'Society Meeting',
  },
  // Add more mock events as needed
];

const TABS = [
  { id: 'events', label: 'Events Participate' },
  { id: 'activity', label: 'Activity Participate' },
];

function App() {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="flex min-h-screen bg-gray-50">
 
      
      <div className="flex-1">
        <Header user={MOCK_USER} />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Events Participation</h1>
          </div>
          
          <EventsTabs
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <div className="mt-6">
            <EventsTable events={MOCK_EVENTS} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;