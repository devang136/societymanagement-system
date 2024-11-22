import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../financialmanagementincomeexpensenote/financialmanagementexpenseui/table';
import { Button } from '../financialmanagementincomeexpensenote/financialmanagementexpenseui/button';
import { formatDate } from '../../lib/utils';
import { Edit, Trash2 } from 'lucide-react';
import { SecurityGuard } from '../../types';

interface SecurityTableProps {
  guards: SecurityGuard[];
  onEdit: (guard: SecurityGuard) => void;
  onDelete: (id: string) => void;
  getStatusColor: (status: string) => string;
}

const SecurityTable: React.FC<SecurityTableProps> = ({ guards, onEdit, onDelete, getStatusColor }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Employee ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Shift</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Joining Date</TableHead>
            <TableHead>Next Shift</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guards.map((guard) => (
            <TableRow key={guard.id}>
              <TableCell>{guard.name}</TableCell>
              <TableCell>{guard.employeeId}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(guard.status)}`}>
                  {guard.status}
                </span>
              </TableCell>
              <TableCell>{guard.shift}</TableCell>
              <TableCell>{guard.location}</TableCell>
              <TableCell>{guard.contactNumber}</TableCell>
              <TableCell>{guard.email}</TableCell>
              <TableCell>{formatDate(new Date(guard.joiningDate))}</TableCell>
              <TableCell>{guard.nextShift}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(guard)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(guard.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {guards.length === 0 && (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-4 text-gray-500">
                No security guards found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SecurityTable;