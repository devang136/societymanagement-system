import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { VisitorTable } from './components/VisitorTable';
import { AddVisitorDialog } from './components/AddVisitorDialog';
import { Visitor, VisitorFormData } from './types/visitor';
import { visitorService } from './services/visitorService';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

function App() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVisitors();
  }, []);

  const loadVisitors = async () => {
    try {
      setIsLoading(true);
      const data = await visitorService.getAllVisitors();
      setVisitors(data);
    } catch (error) {
      console.error('Error loading visitors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddVisitor = async (formData: VisitorFormData) => {
    try {
      const savedVisitor = await visitorService.createVisitor(formData);
      setVisitors(prev => [savedVisitor, ...prev]);
      setIsDialogOpen(false);
      toast.success('Visitor added successfully');
    } catch (error) {
      console.error('Error adding visitor:', error);
      toast.error(error.response?.data?.message || 'Failed to add visitor');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <Toaster position="top-right" />
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
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
        </div>
      ) : (
        <VisitorTable visitors={visitors} />
      )}
      <AddVisitorDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleAddVisitor}
      />
    </div>
  );
}

export default App;