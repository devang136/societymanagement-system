import React from 'react';
import Avatar from '../../assets/Avatar.jpg';
import { XIcon } from '@heroicons/react/solid'; 

const ViewComplaintModal = ({ complaint, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
   
   <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:align-middle">
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={onCancel}
            >
              <XIcon className="h-4 w-4 text-[#00000]" /> 
            </button>
            <div className="bg-white px-6 py-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">View Complaint</h3>
              <hr className="border-[#F4F4F4] mb-4 mt-4" />
              <div className="flex items-center mb-4">
                <img
                  src={complaint.image || Avatar}
                  alt="User"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold text-gray-900">{complaint.complainantName}</p>
                  <p className="text-sm text-gray-500">{complaint.date}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-md text-gray-400">Request Name</p>
                <span className="text-md text-gray-900">{complaint.requestName || 'Unethical Behaviour'}</span>
                <p className="text-md text-gray-400 mt-2">Description</p>
                <span className="text-md text-gray-900">{complaint.description || 'Offering, giving, receiving, and soliciting value to influence actions.'}</span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-sm text-gray-500 mb-1">Wing</span>
                  <span className="font-medium w-6 h-6 rounded-full bg-[#F6F8FB] text-[#5678E9] text-center">{complaint.wing}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">Unit</span>
                  <span className="font-medium text-[#202224]">{complaint.unit}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">Priority</span>
                  <span className={`px-2 py-1 rounded-2xl text-white ${complaint.priority === 'High' ? 'bg-red-500' : complaint.priority === 'Medium' ? 'bg-[#5678E9]' : 'bg-green-500'}`}>
                    {complaint.priority}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">Status</span>
                  <span className="px-2 py-1 rounded-2xl bg-[#EFF2FD] text-[#5678E9]">{complaint.status}</span>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default ViewComplaintModal;

