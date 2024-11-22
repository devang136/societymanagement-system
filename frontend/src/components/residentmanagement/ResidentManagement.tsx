import React, { useState, useEffect } from 'react';
import { getResidents, createResident, updateResident, deleteResident } from '../../services/api';
import { Resident } from '../../types';
import ResidentModal from './ResidentModal';

const ResidentManagement: React.FC = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const data = await getResidents();
      setResidents(data);
    } catch (error) {
      console.error('Error fetching residents:', error);
    }
  };

  const handleAddResident = async (residentData: Omit<Resident, 'id'>) => {
    try {
      await createResident(residentData);
      fetchResidents();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding resident:', error);
    }
  };

  const handleEditResident = async (id: string, residentData: Partial<Resident>) => {
    try {
      await updateResident(id, residentData);
      fetchResidents();
      setShowModal(false);
      setSelectedResident(null);
    } catch (error) {
      console.error('Error updating resident:', error);
    }
  };

  const handleDeleteResident = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resident?')) {
      try {
        await deleteResident(id);
        fetchResidents();
      } catch (error) {
        console.error('Error deleting resident:', error);
      }
    }
  };

  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resident Management</h1>
        <button
          onClick={() => {
            setSelectedResident(null);
            setShowModal(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Resident
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search residents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredResidents.map((resident) => (
              <tr key={resident.id}>
                <td className="px-6 py-4 whitespace-nowrap">{resident.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{resident.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap">{resident.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{resident.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    resident.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {resident.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setSelectedResident(resident);
                      setShowModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteResident(resident.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ResidentModal
          resident={selectedResident}
          onClose={() => {
            setShowModal(false);
            setSelectedResident(null);
          }}
          onSave={selectedResident ? handleEditResident : handleAddResident}
        />
      )}
    </div>
  );
};

export default ResidentManagement;
