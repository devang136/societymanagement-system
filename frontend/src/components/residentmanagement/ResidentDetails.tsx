import React from 'react';
import { ChevronLeft, Download } from 'lucide-react';

interface Document {
  name: string;
  size: string;
  type: string;
}

interface Member {
  firstName: string;
  phoneNo: string;
  age: string;
  gender: string;
  relation?: string;
}

interface ResidentDetailsProps {
  type: 'owner' | 'tenant';
  resident: {
    name: string;
    email: string;
    wing: string;
    unit: string;
    age: string;
    gender: string;
    documents: Document[];
    memberDetails: Member[]; // Changed from members to memberDetails to match the data structure
  };
  onClose: () => void;
}

export function ResidentDetails({ type, resident, onClose }: ResidentDetailsProps) {
  // Ensure we have valid arrays even if they're not provided
  const documents = resident.documents || [];
  const members = resident.memberDetails || []; // Changed from members to memberDetails

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold">View {type === 'owner' ? 'Owner' : 'Tenant'} Details</h2>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-2">
            <img
              src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop`}
              alt=""
              className="w-24 h-24 rounded-full"
            />
          </div>
          <h3 className="text-lg font-semibold">{resident.name}</h3>
          <p className="text-gray-500">{resident.email}</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500">Wing</label>
              <span className="text-sm font-medium">{resident.wing}</span>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Unit</label>
              <span className="text-sm font-medium">{resident.unit}</span>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Age</label>
              <span className="text-sm font-medium">{resident.age}</span>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Gender</label>
              <span className="text-sm font-medium">{resident.gender}</span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Documents</h4>
            <div className="space-y-2">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.size}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Member Counting</h4>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {members.length.toString().padStart(2, '0')}
              </span>
            </div>
            <div className="space-y-4">
              {members.map((member, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500">First Name</label>
                      <span className="text-sm font-medium">{member.firstName}</span>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Phone No</label>
                      <span className="text-sm font-medium">{member.phoneNo}</span>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Age</label>
                      <span className="text-sm font-medium">{member.age}</span>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Gender</label>
                      <span className="text-sm font-medium">{member.gender}</span>
                    </div>
                    {member.relation && (
                      <div>
                        <label className="block text-xs text-gray-500">Relation</label>
                        <span className="text-sm font-medium">{member.relation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}