import React from 'react';
import type { Request } from '../../types';

interface RequestTableProps {
  requests: Request[];
  onView: (request: Request) => void;
  onEdit: (request: Request) => void;
  onDelete: (id: string) => void;
}

export function RequestTable({ requests, onView, onEdit, onDelete }: RequestTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Requester</th>
          <th>Request</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request.id}>
            <td>{request.id}</td>
            <td>{request.requesterName}</td>
            <td>{request.requestName}</td>
            <td>{request.status}</td>
            <td>
              <button onClick={() => onView(request)}>View</button>
              <button onClick={() => onEdit(request)}>Edit</button>
              <button onClick={() => onDelete(request.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 