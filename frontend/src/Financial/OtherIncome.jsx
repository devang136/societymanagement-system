import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface IncomeItem {
  id: number;
  title: string;
  amountPerMember: number;
  totalMembers: number;
  date: string;
  dueDate: string;
  description: string;
}

export default function OtherIncome() {
  const [incomeItems, setIncomeItems] = useState<IncomeItem[]>([
    {
      id: 1,
      title: 'Ganesh chaturthi',
      amountPerMember: 1500,
      totalMembers: 12,
      date: '01/07/2024',
      dueDate: '15/07/2024',
      description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in Resident.',
    },
    {
      id: 2,
      title: 'Navratri',
      amountPerMember: 1500,
      totalMembers: 12,
      date: '01/07/2024',
      dueDate: '15/07/2024',
      description: 'The celebration of Navratri involves the installation of clay idols of Durga in Resident.',
    },
    {
      id: 3,
      title: 'Diwali',
      amountPerMember: 1500,
      totalMembers: 12,
      date: '01/07/2024',
      dueDate: '15/07/2024',
      description: 'The celebration of Diwali involves the lighting of lamps and fireworks in Resident.',
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<IncomeItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<IncomeItem>>({});

  const openCreateModal = () => {
    setNewItem({});
    setIsCreateModalOpen(true);
  };

  const openEditModal = (item: IncomeItem) => {
    setCurrentItem(item);
    setNewItem(item);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (item: IncomeItem) => {
    setCurrentItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleCreate = () => {
    if (newItem.title && newItem.amountPerMember && newItem.date && newItem.dueDate) {
      setIncomeItems([...incomeItems, { ...newItem, id: Date.now(), totalMembers: 12 } as IncomeItem]);
      setIsCreateModalOpen(false);
    }
  };

  const handleEdit = () => {
    if (currentItem && newItem.title && newItem.amountPerMember && newItem.date && newItem.dueDate) {
      setIncomeItems(incomeItems.map(item => item.id === currentItem.id ? { ...item, ...newItem } : item));
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (currentItem) {
      setIncomeItems(incomeItems.filter(item => item.id !== currentItem.id));
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Other Income</h1>
          <button
            onClick={openCreateModal}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Other Income
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {incomeItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <div className="flex space-x-2">
                  <button onClick={() => openEditModal(item)} className="text-white hover:text-blue-200">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => openDeleteModal(item)} className="text-white hover:text-blue-200">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-1">Amount Per Member: ₹{item.amountPerMember}</p>
                <p className="text-sm text-gray-600 mb-1">Total Member: {item.totalMembers}</p>
                <p className="text-sm text-gray-600 mb-1">Date: {item.date}</p>
                <p className="text-sm text-gray-600 mb-1">Due Date: {item.dueDate}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create Other Income</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full border rounded-md p-2 mb-2"
              value={newItem.title || ''}
              onChange={e => setNewItem({ ...newItem, title: e.target.value })}
            />
            <div className="flex space-x-2 mb-2">
              <div className="w-1/2 relative">
                <input
                  type="text"
                  placeholder="Date"
                  className="w-full border rounded-md p-2 pl-8"
                  value={newItem.date || ''}
                  onChange={e => setNewItem({ ...newItem, date: e.target.value })}
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="w-1/2 relative">
                <input
                  type="text"
                  placeholder="Due Date"
                  className="w-full border rounded-md p-2 pl-8"
                  value={newItem.dueDate || ''}
                  onChange={e => setNewItem({ ...newItem, dueDate: e.target.value })}
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <textarea
              placeholder="Description"
              className="w-full border rounded-md p-2 mb-2"
              value={newItem.description || ''}
              onChange={e => setNewItem({ ...newItem, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-full border rounded-md p-2 mb-4"
              value={newItem.amountPerMember || ''}
              onChange={e => setNewItem({ ...newItem, amountPerMember: Number(e.target.value) })}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit {currentItem?.title}</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full border rounded-md p-2 mb-2"
              value={newItem.title || ''}
              onChange={e => setNewItem({ ...newItem, title: e.target.value })}
            />
            <div className="flex space-x-2 mb-2">
              <div className="w-1/2 relative">
                <input
                  type="text"
                  placeholder="Date"
                  className="w-full border rounded-md p-2 pl-8"
                  value={newItem.date || ''}
                  onChange={e => setNewItem({ ...newItem, date: e.target.value })}
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="w-1/2 relative">
                <input
                  type="text"
                  placeholder="Due Date"
                  className="w-full border rounded-md p-2 pl-8"
                  value={newItem.dueDate || ''}
                  onChange={e => setNewItem({ ...newItem, dueDate: e.target.value })}
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <textarea
              placeholder="Description"
              className="w-full border rounded-md p-2 mb-2"
              value={newItem.description || ''}
              onChange={e => setNewItem({ ...newItem, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-full border rounded-md p-2 mb-4"
              value={newItem.amountPerMember || ''}
              onChange={e => setNewItem({ ...newItem, amountPerMember: Number(e.target.value) })}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Delete {currentItem?.title}?</h2>
            <p className="mb-4">Are you sure you want to delete this?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}