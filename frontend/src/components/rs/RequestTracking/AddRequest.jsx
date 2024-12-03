import React, { useState } from 'react';

const AddRequestModal = ({ onSave, onCancel }) => {
  const [requesterName, setRequesterName] = useState('');
  const [RequestName, setRequestName] = useState('');
  const [date, setDate] = useState('');
  const [wing, setWing] = useState('');
  const [unit, setUnit] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Open');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      requesterName,
      RequestName,
      date,
      wing,
      unit,
      priority,
      status,
    };
    onSave(newRequest);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-5">

        <h2 className="text-xl font-semibold font-poppins">Create Request</h2>
        <hr className="border-[#F4F4F4] mb-4 mt-4" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#202224] font-poppins">Complainer Name<span className='text-red-500'>*</span></label>
            <input
              type="text"
              value={requesterName}
              onChange={(e) => setRequesterName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md border-[#A7A7A7]/40 shadow-sm "
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#202224] font-poppins">Request Name<span className='text-red-500'>*</span></label>
            <input
              type="text"
              value={RequestName}
              onChange={(e) => setRequestName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md border-[#A7A7A7]/40 shadow-sm "
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#202224] font-poppins">
              Request Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md border-[#A7A7A7]/40 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#202224] font-poppins">Wing<span className='text-red-500'>*</span></label>
              <input
                type="text"
                value={wing}
                onChange={(e) => setWing(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md border-[#A7A7A7]/40 shadow-sm "
                placeholder="Enter Wing"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#202224] font-poppins">Unit<span className='text-red-500'>*</span></label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md border-[#A7A7A7]/40 shadow-sm "
                placeholder="Enter Unit"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#202224] font-poppins">Priority<span className='text-red-500'>*</span></label>
            <div className="mt-2 space-x-4">
              {['High', 'Medium', 'Low'].map((priorityOption) => (
                <label key={priorityOption} className="inline-flex items-center space-x-2 px-3 py-2 border rounded-md border-gray-300 hover:border-[#FE512E]">
                  <input
                    type="radio"
                    name="priority"
                    value={priorityOption}
                    checked={priority === priorityOption}
                    onChange={(e) => setPriority(e.target.value)}
                    className="form-radio "
                  />
                  <span className="ml-2 text-sm text-[#202224] text-center">{priorityOption}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#202224] font-poppins" >Status<span className='text-red-500'>*</span></label>
            <div className="mt-2 space-x-4">
              {['Open', 'Pending', 'Solve'].map((statusOption) => (
                <div
                  key={statusOption}
                  className="inline-flex items-center space-x-2 px-3 py-2 border rounded-md border-gray-300 hover:border-orange-500"
                >
                  <input
                    type="radio"
                    name="status"
                    value={statusOption}
                    checked={status === statusOption}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-radio "
                  />
                  <span className="text-sm text-[#202224] text-center">{statusOption}</span>
                </div>
              ))}
            </div>

          </div>


          <div className=" py-3 flex space-x-2 ">
            <button
              type="button"
              onClick={onCancel}
              className="w-1/2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-1/2 inline-flex justify-center rounded-md text-gray-700 bg-[#F6F8FB] px-4 py-2 text-base font-medium shadow-sm sm:text-sm hover:bg-gradient-to-r hover:from-[#FE512E] hover:to-[#F09619] hover:text-white"
              style={{
                transition: "background 0.3s ease",
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRequestModal;
