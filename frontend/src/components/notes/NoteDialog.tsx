import React, { useEffect, useState } from 'react';

interface NoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (noteData: any) => void;
  initialData?: any;
  initialNote?: any;
  mode?: 'edit' | 'add';
}

const NoteDialog: React.FC<NoteDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  initialNote,
  mode = 'add'
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const data = initialData || initialNote;
    if (data) {
      setTitle(data.title || '');
      setDescription(data.description || data.content || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [initialData, initialNote, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      date: new Date(),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {mode === 'edit' ? 'Edit Note' : 'Create Note'}
          </h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 min-h-[100px]"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteDialog;
