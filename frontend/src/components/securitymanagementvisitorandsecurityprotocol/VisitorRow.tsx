import React from 'react';
import { Clock, Home } from 'lucide-react';

interface VisitorRowProps {
  visitor: {
    name: string;
    phone: string;
    date: string;
    unit: string;
    time: string;
    avatarUrl: string;
  };
}

export default function VisitorRow({ visitor }: VisitorRowProps) {
  return (
    <div className="flex items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
      <img
        src={visitor.avatarUrl}
        alt={visitor.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="ml-4 flex-1 grid grid-cols-5 gap-4 items-center">
        <div className="font-medium text-gray-900">{visitor.name}</div>
        <div className="text-gray-600">{visitor.phone}</div>
        <div className="text-gray-600">{visitor.date}</div>
        <div className="flex items-center gap-2">
          <Home className="w-4 h-4 text-blue-500" />
          <span className="text-gray-900">{visitor.unit}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{visitor.time}</span>
        </div>
      </div>
    </div>
  );
}