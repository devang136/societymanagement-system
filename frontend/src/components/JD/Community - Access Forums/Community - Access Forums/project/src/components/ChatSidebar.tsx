import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ChatContact } from './ChatContact';
import { useChatContext } from '../context/ChatContext';

export function ChatSidebar() {
  const { state, dispatch } = useChatContext();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch({ type: 'FILTER_CONTACTS', payload: query });
  };

  const handleContactClick = (contact: typeof state.contacts[0]) => {
    dispatch({ type: 'SET_ACTIVE_CONTACT', payload: contact });
  };

  return (
    <div className="w-80 border-r border-gray-200 h-full flex flex-col">
      <div className="p-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search name"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {state.contacts.map((contact) => (
          <ChatContact
            key={contact.id}
            {...contact}
            isActive={contact.id === state.activeContact?.id}
            onClick={() => handleContactClick(contact)}
          />
        ))}
      </div>
    </div>
  );
}