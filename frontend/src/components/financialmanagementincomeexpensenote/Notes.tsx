import * as React from 'react';
import { Button } from './financialmanagementexpenseui/button';
import { PlusIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './financialmanagementexpenseui/table';
import { formatDate } from '@/lib/utils';
import { mockNotes } from '@/data/mockData';
import NoteModal from './NoteModal';

export interface Note {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: string;
}

interface NotesProps {
  notes?: Note[];
  onAddNote?: (note: Note) => void;
  onEditNote?: (note: Note) => void;
  onDeleteNote?: (id: number) => void;
}

export function Notes({ notes: propNotes, onAddNote, onEditNote, onDeleteNote }: NotesProps) {
  const [localNotes, setLocalNotes] = React.useState<Note[]>(() => propNotes || mockNotes);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);

  const handleAddClick = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = (noteData: Note) => {
    if (noteData.id) {
      if (onEditNote) {
        onEditNote(noteData);
      } else {
        setLocalNotes(localNotes.map(note => note.id === noteData.id ? noteData : note));
      }
    } else {
      const newNote = {
        ...noteData,
        id: Math.max(0, ...localNotes.map(n => n.id)) + 1,
        date: new Date().toISOString()
      };
      if (onAddNote) {
        onAddNote(newNote);
      } else {
        setLocalNotes([...localNotes, newNote]);
      }
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (id: number) => {
    if (onDeleteNote) {
      onDeleteNote(id);
    } else {
      setLocalNotes(localNotes.filter(note => note.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notes</h2>
        <Button onClick={handleAddClick}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Note
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localNotes.map((note) => (
            <TableRow key={note.id}>
              <TableCell>{note.title}</TableCell>
              <TableCell>{note.description}</TableCell>
              <TableCell>{formatDate(note.date)}</TableCell>
              <TableCell>{note.priority}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleEditClick(note)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteClick(note.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isModalOpen && (
        <NoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveNote}
          initialData={selectedNote}
        />
      )}
    </div>
  );
}
