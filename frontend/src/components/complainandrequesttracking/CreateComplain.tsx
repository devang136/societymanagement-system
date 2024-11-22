import React, { useState } from 'react';

interface Complaint {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'New' | 'In Progress' | 'Resolved';
  dateSubmitted: string;
  submittedBy: string;
}

const CreateComplain: React.FC = () => {
  const [complaint, setComplaint] = useState<Omit<Complaint, 'id' | 'dateSubmitted' | 'status'>>({
    title: '',
    description: '',
    category: '',
    priority: 'Medium',
    submittedBy: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the complaint
    console.log('Submitting complaint:', complaint);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Complaint</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={complaint.title}
            onChange={(e) => setComplaint({ ...complaint, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={complaint.description}
            onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={complaint.category}
            onChange={(e) => setComplaint({ ...complaint, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select a category</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Security">Security</option>
            <option value="Noise">Noise</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={complaint.priority}
            onChange={(e) => setComplaint({ ...complaint, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label htmlFor="submittedBy" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="submittedBy"
            value={complaint.submittedBy}
            onChange={(e) => setComplaint({ ...complaint, submittedBy: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit Complaint
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComplain;
