import React from 'react';
import { format } from 'date-fns';

interface Event {
  id: string;
  participator: {
    name: string;
    avatar: string;
  };
  description: string;
  activityTime: string;
  activityDate: string;
  activityName: string;
}

interface EventsTableProps {
  events: Event[];
  onParticipate: (eventId: string) => void;
}

const EventsTable = ({ events, onParticipate }: EventsTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="px-6 py-3 text-sm font-medium text-gray-500">Participator Name</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-500">Description</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-500">Activity Time</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-500">Activity Date</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-500">Activity Name</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={event.participator.avatar}
                    alt={event.participator.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">{event.participator.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{event.description}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{event.activityTime}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {format(new Date(event.activityDate), 'dd/MM/yyyy')}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{event.activityName}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onParticipate(event.id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                >
                  Participate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;