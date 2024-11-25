import React from 'react';
import { FiPlus } from 'react-icons/fi';

interface StatCardProps {
  title: string;
  value: string;
  color: 'orange' | 'green' | 'blue' | 'purple';
}

export function StatCard({ title, value, color }: StatCardProps) {
  const colors = {
    orange: 'bg-orange-50 text-orange-500',
    green: 'bg-green-50 text-green-500',
    blue: 'bg-blue-50 text-blue-500',
    purple: 'bg-purple-50 text-purple-500'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-600">{title}</h3>
        <button className={`p-2 rounded-lg ${colors[color]}`}>
          <FiPlus />
        </button>
      </div>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}
// StatCard dashboard file  