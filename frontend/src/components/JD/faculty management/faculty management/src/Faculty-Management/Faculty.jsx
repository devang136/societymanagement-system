
import React, { useState } from 'react';
import { Plus, X, Edit2 } from 'lucide-react';

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState([
    {
      name: "Parking Facilities",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in Resident.",
      scheduleDate: "01/07/2024",
      remindBefore: "4-day",
    },
    {
      name: "Community Center",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in Resident.",
      scheduleDate: "01/07/2024",
      remindBefore: "4-day",
    },
    {
      name: "Swimming Pool",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in Resident.",
      scheduleDate: "01/07/2024",
      remindBefore: "4-day",
    },
    {
      name: "Parks and Green Spaces",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in Resident.",
      scheduleDate: "01/07/2024",
      remindBefore: "4-day",
    },
    {
      name: "Wi-Fi and Connectivity",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in Resident.",
      scheduleDate: "01/07/2024",
      remindBefore: "4-day",
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFacility, setCurrentFacility] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    scheduleDate: "",
    remindBefore: "",
  });

  const handleOpenModal = (facility = null) => {
    if (facility) {
      setIsEditing(true);
      setCurrentFacility(facility);
      setFormData(facility);
    } else {
      setIsEditing(false);
      setFormData({
        name: "",
        description: "",
        scheduleDate: "",
        remindBefore: "",
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentFacility(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (isEditing) {
      setFacilities(facilities.map(f => 
        f === currentFacility ? formData : f
      ));
    } else {
      setFacilities([...facilities, formData]);
    }
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Facility Management</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Create Facility
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-blue-100 hover:border-blue-200 transition-all"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-blue-600">{facility.name}</h3>
                  <button
                    onClick={() => handleOpenModal(facility)}
                    className="text-blue-600 hover:bg-blue-50 p-1 rounded-full transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Upcoming Schedule Service Date</p>
                    <p className="text-sm font-medium text-gray-700">{facility.scheduleDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{facility.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {isEditing ? 'Edit' : 'Create'} Facility
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Facility Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter facility name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Schedule Service Date*
                    </label>
                    <input
                      type="date"
                      name="scheduleDate"
                      value={formData.scheduleDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Remind Before*
                    </label>
                    <select
                      name="remindBefore"
                      value={formData.remindBefore}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select reminder period</option>
                      <option value="1-day">1 Day</option>
                      <option value="3-day">3 Days</option>
                      <option value="4-day">4 Days</option>
                      <option value="7-day">7 Days</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilityManagement;