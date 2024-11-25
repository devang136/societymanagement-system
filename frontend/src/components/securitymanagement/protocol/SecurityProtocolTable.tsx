import React from 'react';
import { Check, Eye, Trash2 } from 'lucide-react';

interface Protocol {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

interface SecurityProtocolTableProps {
  protocols: Protocol[];
  onEdit: (protocol: Protocol) => void;
  onDelete: (id: string) => void;
  onView: (protocol: Protocol) => void;
}

export default function SecurityProtocolTable({
  protocols,
  onEdit,
  onDelete,
  onView,
}: SecurityProtocolTableProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Title</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Description</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Date</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Time</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {protocols.map((protocol) => (
              <tr key={protocol.id} className="border-b border-gray-200 last:border-0">
                <td className="px-6 py-4 text-sm text-gray-900">{protocol.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{protocol.description}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{protocol.date}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{protocol.time}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onView(protocol)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(protocol)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="Edit"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(protocol.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
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