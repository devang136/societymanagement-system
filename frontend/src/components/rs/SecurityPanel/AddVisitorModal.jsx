import React from 'react';

const AddVisitorModal = ({ isOpen, onClose }) => {
    return (
        isOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-[#000000] opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
                    <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:align-middle">
                        <div className="bg-white px-4 pt-5 sm:p-4 sm:pb-4">
                            <h3 className="text-lg font-semibold font-poppins leading-6 text-[#202224]">Add Visitor Details.</h3>
                            <hr className="border-[#F4F4F4] mb-4 mt-4" />
                            <div className="mt-2">
                                <div className="mb-4">
                                    <label htmlFor="fullName" className="block text-sm font-medium text-[#202224] mb-1">
                                        Visitor Name <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        id="fullName"
                                        type="text"
                                        className="w-full px-3 py-2 border border-[#D3D3D3]/60 rounded-md "
                                        placeholder="Enter Name"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#202224] font-poppins">Wing<span className='text-red-500'>*</span></label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full px-3 py-2 border rounded-md border-[#A7A7A7]/40 shadow-sm "
                                            placeholder="Enter Wing"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#202224] font-poppins">Unit<span className='text-red-500'>*</span></label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full px-3 py-2 border rounded-md border-[#A7A7A7]/40 shadow-sm "
                                            placeholder="Enter Unit"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#202224]"> Date<span className='text-red-500'>*</span></label>
                                        <input
                                            type="date"
                                            name="date"
                                            className="mt-1 block w-full border border-[#A7A7A7]/40 rounded-md shadow-sm py-2 px-3 sm:text-sm text-[#A7A7A7]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#202224]"> Time<span className='text-red-500'>*</span></label>
                                        <input
                                            type="time"
                                            name="time"
                                            className="mt-1 block w-full border border-[#A7A7A7]/40 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 flex space-x-2 sm:px-4 pb-5">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-1/2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-[#202224] shadow-sm sm:text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="w-1/2 inline-flex justify-center rounded-md text-[#202224] bg-[#F6F8FB] px-4 py-2 text-base font-medium shadow-sm  sm:text-sm hover:bg-gradient-to-r hover:from-[#FE512E] hover:to-[#F09619] hover:text-white"
                                style={{
                                    transition: "background 0.3s ease",
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default AddVisitorModal;
