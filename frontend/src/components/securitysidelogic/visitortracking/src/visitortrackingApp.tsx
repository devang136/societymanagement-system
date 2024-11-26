import React, { useState } from 'react';
import { Header } from './components/Header';

import { VisitorTable } from './components/VisitorTable';
import { AddVisitorDialog } from './components/AddVisitorDialog';
import { Visitor, VisitorFormData } from './types/visitor';
React
const initialVisitors: Visitor[] = [
  {
    id: '1',
    name: 'Evelyn Harper',
    phoneNumber: '97852 12359',
    date: '10/01/2024',
    unitNumber: '1001',
    time: '3:45 PM',
    avatar: '',
  },
  {
    id: '2',
    name: 'Wade Warren',
    phoneNumber: '97892 25893',
    date: '10/01/2024',
    unitNumber: '1002',
    time: '2:45 AM',
    avatar: '',
  },
  // Add more visitors as needed
];

function App() {
  const [visitors, setVisitors] = useState<Visitor[]>(initialVisitors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddVisitor = (formData: VisitorFormData) => {
    const newVisitor: Visitor = {
      id: String(visitors.length + 1),
      name: formData.name,
      phoneNumber: '97XXX XXXXX',
      date: formData.date,
      unitNumber: `${formData.wing}${formData.unit}`,
      time: formData.time,
      avatar: '',
    };
    setVisitors([...visitors, newVisitor]);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Visitor Tracking</h1>
          <p className="text-sm text-gray-500">Manage and track visitors</p>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
        >
          Add Visitor details
        </button>
      </div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <select className="rounded-md border bg-white px-3 py-2 text-sm">
            <option>Week</option>
            <option>Month</option>
            <option>Year</option>
          </select>
        </div>
      </div>
      <VisitorTable visitors={visitors} />
      <AddVisitorDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleAddVisitor}
      />
    </div>
  );
}

export default App;