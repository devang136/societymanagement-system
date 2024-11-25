import { Edit2, Trash2, MessageCircle, Eye } from 'lucide-react';
import { SecurityGuard } from './types';
import React from 'react';
interface SecurityTableProps {
  guards: SecurityGuard[];
  onEdit: (guard: SecurityGuard) => void;
  onDelete: (guard: SecurityGuard) => void;
  onView: (guard: SecurityGuard) => void;
}

export function SecurityTable({ guards, onEdit, onDelete, onView }: SecurityTableProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Security Guard Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select Shift
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shift Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shift Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {guards.map((guard) => (
              <tr key={guard.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={guard.avatar}
                      alt={guard.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="ml-2">{guard.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{guard.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    guard.shift === 'Day' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {guard.shift}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{guard.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{guard.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    guard.gender === 'Male'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-pink-100 text-pink-800'
                  }`}>
                    {guard.gender}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView(guard)}
                      className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEdit(guard)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <MessageCircle size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(guard)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}