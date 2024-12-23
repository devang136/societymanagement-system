import React from 'react';

const DeleteRequestModal = ({ onDelete, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-6">
        <h2 className="text-lg font-semibold mb-4 text-[#202224] font-poppins">Delete Request?</h2>
        <hr className="border-[#F4F4F4] mb-4 mt-4" />
        <p className="text-[#A7A7A7] text-sm mb-6 font-poppins">Are you sure you want to delete this Request?</p>
        <div className=" flex space-x-2 ">
              <button
                type="button"
                onClick={onCancel}
                className="w-1/2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm font-poppins  sm:text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="w-1/2 inline-flex justify-center rounded-md border border-transparent bg-[#E74C3C] px-4 py-2 text-base font-medium text-white shadow-sm font-poppins sm:text-sm"
              >
                Delete
              </button>
            </div>
      </div>
    </div>
  );
};

export default DeleteRequestModal;
