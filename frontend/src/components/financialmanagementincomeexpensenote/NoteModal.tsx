import React, { useState, useEffect } from 'react';
import { Note } from '@/types/expense';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Note) => void;
  editNote?: Note;
}

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose, onSave, editNote }) => {
  const [note, setNote] = useState<Note>({
    id: 0,
    title: '',
    description: '',
    date: new Date().toISOString(),
    priority: 'Medium'
  });

  useEffect(() => {
    if (editNote) {
      setNote(editNote);
    }
  }, [editNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(note);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editNote ? 'Edit Note' : 'Add New Note'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={note.description}
                onChange={(e) => setNote({ ...note, description: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={note.date.split('T')[0]}
                onChange={(e) => setNote({ ...note, date: e.target.value + 'T00:00:00.000Z' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={note.priority}
                onChange={(e) => setNote({ ...note, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {editNote ? 'Save Changes' : 'Add Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
