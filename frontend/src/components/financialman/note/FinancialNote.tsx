import React, { useState } from 'react';
import NoteCard from './NoteCard';
import NoteDialog from './NoteDialog';

interface NoteType {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

const defaultNotes = [
  {
    id: 'rent',
    title: 'Rent or Mortgage',
    description: 'A visual representation of your spending categories visual representation.',
    date: new Date().toISOString().split('T')[0],
    category: 'housing'
  },
  {
    id: 'housing',
    title: 'Housing Costs',
    description: 'A visual representation of your spending categories visual representation.',
    date: new Date().toISOString().split('T')[0],
    category: 'housing'
  },
  // ... you can add more default notes here
];

export function FinancialNote() {
  const [notes, setNotes] = useState(defaultNotes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);

  const handleEdit = (note: NoteType) => {
    setSelectedNote(note);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  const handleSave = (noteData: { title: string; description: string; date: string }) => {
    if (dialogMode === 'add') {
      const newNote = {
        id: Date.now().toString(),
        title: noteData.title,
        description: noteData.description,
        date: noteData.date,
        category: 'general'
      };
      setNotes([...notes, newNote]);
    } else {
      setNotes(notes.map(note => 
        note.id === selectedNote?.id 
          ? { ...note, ...noteData }
          : note
      ));
    }
    setIsDialogOpen(false);
    setSelectedNote(null);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Financial Notes</h1>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              description={note.description}
              onEdit={() => handleEdit(note)}
            />
          ))}
        </div>
      </div>

      <NoteDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        initialData={selectedNote ? {
          title: selectedNote.title,
          description: selectedNote.description,
          date: selectedNote.date
        } : undefined}
        mode={dialogMode}
      />
    </div>
  );
} 