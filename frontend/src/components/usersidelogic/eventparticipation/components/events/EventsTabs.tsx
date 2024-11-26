import React from 'react';
import { cn } from '../../utils/cn';

interface Tab {
  id: string;
  label: string;
}

interface EventsTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const EventsTabs = ({ tabs, activeTab, onTabChange }: EventsTabsProps) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors relative',
              activeTab === tab.id
                ? 'text-orange-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default EventsTabs;