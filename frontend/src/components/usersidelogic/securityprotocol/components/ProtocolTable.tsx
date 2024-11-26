import React from 'react';
import { formatDate } from '../utils/dateUtils';

interface Protocol {
  title: string;
  description: string;
  date: string;
  time: string;
}

interface ProtocolTableProps {
  protocols: Protocol[];
}

export function ProtocolTable({ protocols }: ProtocolTableProps) {
  return (
    <div className="mt-6">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {protocols.map((protocol, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {protocol.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {protocol.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {protocol.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {protocol.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}