import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import ComplaintForm from './ComplaintForm';
import { complaintService, Complaint, ComplaintData } from '../services/complaintService';

export default function ServiceComplaintApp() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await complaintService.getComplaints();
      setComplaints(data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleComplaintSubmit = async (complaintData: ComplaintData) => {
    try {
      console.log('Submitting complaint:', complaintData);
      
      // Get user data from localStorage
      const userData = localStorage.getItem('user');
      if (!userData) {
        toast.error('User data not found. Please login again.');
        return;
      }

      const user = JSON.parse(userData);
      
      // Add wing and unit from user data
      const completeComplaintData = {
        ...complaintData,
        wing: user.wing,
        unit: user.unit
      };

      console.log('Complete complaint data:', completeComplaintData);
      const newComplaint = await complaintService.createComplaint(completeComplaintData);
      setComplaints(prev => [newComplaint, ...prev]);
      toast.success('Complaint submitted successfully');
    } catch (error) {
      console.error('Error creating complaint:', error);
      toast.error('Failed to submit complaint');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Service Complaints</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Submit New Complaint</h2>
        <ComplaintForm onSubmit={handleComplaintSubmit} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Complaints</h2>
        {complaints.length === 0 ? (
          <p>No complaints found</p>
        ) : (
          <div className="space-y-4">
            {complaints.map(complaint => (
              <div
                key={complaint._id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <h3 className="font-semibold">{complaint.title}</h3>
                <p className="text-gray-600">{complaint.description}</p>
                <div className="mt-2 flex gap-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    complaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                    complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {complaint.priority}
                  </span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    complaint.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                    complaint.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {complaint.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 