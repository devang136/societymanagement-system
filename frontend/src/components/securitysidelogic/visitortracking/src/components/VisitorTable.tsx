import React from 'react';
import { Visitor } from '../types/visitor';
import { User } from 'lucide-react';

interface VisitorTableProps {
  visitors: Visitor[];
}

export function VisitorTable({ visitors }: VisitorTableProps) {
  return (
    <div className="rounded-lg border bg-white">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50 text-sm">
            <th className="py-3 px-4 text-left">Visitor Name</th>
            <th className="py-3 px-4 text-left">Phone Number</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Unit Number</th>
            <th className="py-3 px-4 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor.id} className="border-b last:border-0">
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-100 p-1">
                    <User className="h-full w-full text-gray-600" />
                  </div>
                  <span>{visitor.name}</span>
                </div>
              </td>
              <td className="py-3 px-4">{visitor.phoneNumber}</td>
              <td className="py-3 px-4">{visitor.date}</td>
              <td className="py-3 px-4">
                <span className="inline-flex h-6 items-center rounded-full bg-blue-50 px-2 text-xs font-medium text-blue-700">
                  {visitor.unitNumber}
                </span>
              </td>
              <td className="py-3 px-4">{visitor.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}