import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NoteCard from './components/NoteCard';
import NoteDialog from './components/NoteDialog';

const defaultNotes = [
  {
    id: 'rent',
    title: 'Rent or Mortgage',
    description: 'A visual representation of your spending categories visual representation.',
  },
  {
    id: 'housing',
    title: 'Housing Costs',
    description: 'A visual representation of your spending categories visual representation.',
  },
  {
    id: 'taxes',
    title: 'Property Taxes',
    description: 'A visual representation of your spending categories visual representation.',
  },
  {
    id: 'maintenance',
    title: 'Maintenance Fees',
    description: 'A visual representation of your spending categories visual representation.',
  },
  {
    id: 'transport',
    title: 'Rent or Transportation',
    description: 'A visual representation of your spending categories visual representation.',
  },
  {
    id: 'breakdown',
    title: 'Breakdown',
    description: 'A visual representation of your spending categories visual representation.',
  },
  {
    id: 'tracker',
    title: 'Expense Tracker',
    description: 'A visual representation of your spending categories visual representation.',
  },
  {
    id: 'personal',
    title: 'Personal Expenses',
    description: 'A visual representation of your spending categories visual representation.',
  },
];

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [selectedNote, setSelectedNote] = useState<any>(null);

  const handleEdit = (note: any) => {
    setSelectedNote(note);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  const handleSave = (noteData: any) => {
    console.log('Saving note:', noteData);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          userName="Moni Roy"
          userImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Note</h1>
            <button
              onClick={() => {
                setDialogMode('add');
                setSelectedNote(null);
                setIsDialogOpen(true);
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Create Note
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {defaultNotes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                description={note.description}
                onEdit={() => handleEdit(note)}
              />
            ))}
          </div>
        </main>
      </div>

      <NoteDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        initialData={selectedNote}
        mode={dialogMode}
      />
    </div>
  );
}

export default App;