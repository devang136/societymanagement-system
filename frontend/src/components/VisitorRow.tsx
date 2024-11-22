import React from 'react';

export interface Visitor {
  id: string;
  name: string;
  purpose: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected';
  hostName: string;
  contactNumber: string;
}

interface VisitorRowProps {
  visitor: Visitor;
  onApprove: (visitor: Visitor) => void;
  onReject: (visitor: Visitor) => void;
  onView: (visitor: Visitor) => void;
}

const VisitorRow: React.FC<VisitorRowProps> = ({
  visitor,
  onApprove,
  onReject,
  onView,
}) => {
  const getStatusColor = (status: Visitor['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {visitor.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {visitor.purpose}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {visitor.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {visitor.time}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {visitor.hostName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {visitor.contactNumber}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(visitor.status)}`}>
          {visitor.status.charAt(0).toUpperCase() + visitor.status.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
        <button
          onClick={() => onView(visitor)}
          className="text-blue-600 hover:text-blue-900"
        >
          View
        </button>
        {visitor.status === 'pending' && (
          <>
            <button
              onClick={() => onApprove(visitor)}
              className="text-green-600 hover:text-green-900"
            >
              Approve
            </button>
            <button
              onClick={() => onReject(visitor)}
              className="text-red-600 hover:text-red-900"
            >
              Reject
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default VisitorRow;
