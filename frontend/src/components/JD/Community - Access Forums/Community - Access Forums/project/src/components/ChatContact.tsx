import React from 'react';

interface ChatContactProps {
  id: number;
  name: string;
  status: string;
  time: string;
  avatar: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function ChatContact({ name, status, time, avatar, isActive, onClick }: ChatContactProps) {
  return (
    <div
      className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
        isActive ? 'bg-gray-50' : ''
      }`}
      onClick={onClick}
    >
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">{name}</h3>
          <span className="text-sm text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{status}</p>
      </div>
    </div>
  );
}