import React, { useState } from 'react'
import { Check, Eye, Pencil, Trash2, Sun, Moon, Upload, X } from 'lucide-react'
import Avatar from '../assets/Avatar.jpg'
import { MdEditSquare } from "react-icons/md";
import { HiMiniEye } from "react-icons/hi2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaTimes } from 'react-icons/fa';
import { FaUser } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { BiSolidMoon } from "react-icons/bi";


const initialGuards = [
  { id: 1, name: "Brooklyn Simmons", phone: "94564 96321", shift: "Day", date: "10/02/2024", time: "2:45 PM", gender: "Male" },
  { id: 2, name: "Leslie Alexander", phone: "94564 96322", shift: "Night", date: "10/02/2024", time: "8:45 PM", gender: "Female" },
  { id: 3, name: "Guy Hawkins", phone: "94564 96323", shift: "Day", date: "11/02/2024", time: "9:00 AM", gender: "Male" },
  { id: 4, name: "Theresa Webb", phone: "94564 96324", shift: "Night", date: "11/02/2024", time: "7:30 PM", gender: "Female" },
]

export default function SecurityGuardManagement() {
  const [guards, setGuards] = useState(initialGuards)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [selectedGuard, setSelectedGuard] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    shift: '',
    date: '',
    time: '',
    gender: ''
  })

  const openModal = (mode, guard = null) => {
    setModalMode(mode)
    setSelectedGuard(guard)
    setFormData(guard || {
      name: '',
      phone: '',
      shift: '',
      date: '',
      time: '',
      gender: ''
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedGuard(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (modalMode === 'add') {
      setGuards([...guards, { ...formData, id: guards.length + 1 }])
    } else if (modalMode === 'edit') {
      setGuards(guards.map(g => g.id === selectedGuard.id ? { ...g, ...formData } : g))
    }
    closeModal()
  }

  const handleDelete = () => {
    setGuards(guards.filter(g => g.id !== selectedGuard.id))
    setIsDeleteDialogOpen(false)
    setSelectedGuard(null)
  }

  return (

    <div className="flex bg-[#F0F5FB]">
    <main className="flex-1 overflow-x-hidden overflow-y-auto ">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5">
        <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#202224]">Security Guard Details</h3>
                <button
                onClick={() => openModal('add')}
                  className="text-white font-bold py-2 px-4 rounded flex items-center"
                  style={{
                    background: "linear-gradient(to right, #FE512E, #F09619)",
                    transition: "background 0.3s ease",
                  }}
                >
                 Add Security
                </button>
              </div>
            </div>

          <div className="overflow-x-auto px-6 py-1">
            <table className="min-w-full rounded-t-lg divide-y divide-gray-200">
              <thead className="bg-[#5678E9]/10">
                <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#000000] font-poppins tracking-wider">
                Security Guard Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#000000] font-poppins tracking-wider">
                  Phone Number
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-[#000000] font-poppins tracking-wider">
                  Select Shift
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-[#000000] font-poppins tracking-wider">
                  Shift Date
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-[#000000] font-poppins tracking-wider">
                  Shift Time
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-[#000000] font-poppins tracking-wider">
                  Gender
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-[#000000] font-poppins tracking-wider">
                  Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
           
              {guards.map((guard) => (
              <tr key={guard.id}>
                 <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={Avatar} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{guard.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm  text-[#4f4f4f]">{guard.phone}</td>
                
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`w-32 py-2 inline-flex text-xs leading-5 font-semibold rounded-full items-center justify-center ${
                    guard.shift === 'Day' ? 'bg-[#f4f4f4] text-[#ff930d]' : 'bg-[#4f4f4f] text-white'
                  }`}>
                    {guard.shift === 'Day' ? <MdSunny className="w-4 h-4 mr-2" /> : <BiSolidMoon  className="w-4 h-4 mr-2" />}
                    {guard.shift}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4f4f4f] text-center">{guard.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4f4f4f] text-center"><span className='bg-[#f8f6fb] rounded-xl px-3 py-1'>{guard.time}</span></td>
                <td className="px-6 py-2 whitespace-nowrap text-center">
                        <span className={`w-32 py-2 inline-flex text-md leading-5 font-semibold rounded-full items-center justify-center ${
                         guard.gender === 'Male' ? 'bg-[#FFF1F8] text-[#fe76ab]' : 'bg-[#F1F0FF] text-[#5678e9]'
                        }`}>
                          {guard.gender === 'Male' ? (
                            <FaUser className="mr-2 text-sm" /> 
                          ) : (
                            <FaUser className="mr-2 text-sm" /> 
                          )}
                          {guard.gender}
                        </span>
                      </td>
               
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                  <button onClick={() => openModal('edit', guard)}  className="p-1 text-[#39973d] bg-blue-50 p-1.5 rounded-md mr-2">
                  <MdEditSquare className="h-4 w-4" />
                  </button>
                  <button onClick={() => openModal('view', guard)} className="p-1 text-blue-600 bg-blue-50 p-1.5 rounded-md mr-2">
                  <HiMiniEye className="h-4 w-4" />
                  </button>
                  <button onClick={() => { setSelectedGuard(guard); setIsDeleteDialogOpen(true); }} className="p-1 text-red-600 bg-blue-50 p-1.5 rounded-md mr-2">
                  <RiDeleteBin5Fill className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {modalMode === 'add' ? 'Add Security' : modalMode === 'edit' ? 'Edit Security' : 'View Security Guard Details'}
                  </h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {modalMode !== 'view' ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <img
                          src={`new`}
                          alt="Profile"
                          className="w-24 h-24 rounded-full"
                        />
                        <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
                          <Upload className="w-4 h-4" />
                          <input type="file" className="hidden" accept="image/*" />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone Number*</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Gender*</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Shift*</label>
                        <select
                          name="shift"
                          value={formData.shift}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        >
                          <option value="">Select Shift</option>
                          <option value="Day">Day</option>
                          <option value="Night">Night</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Shift Date*</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Shift Time*</label>
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Upload Aadhar Card*</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:col-start-2 sm:text-sm"
                      >
                        {modalMode === 'add' ? 'Create' : 'Save'}
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center mb-4">
                      <img
                        src={Avatar}
                        alt={selectedGuard.name}
                        className="w-24 h-24 rounded-full"
                      />
                    </div>
                    <div className="text-center">
                      <h2 className="text-lg font-semibold">{selectedGuard.name}</h2>
                      <p className="text-sm text-gray-500">{selectedGuard.date}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm font-medium">Shift</p>
                        <p className="text-sm text-gray-500">{selectedGuard.shift}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Time</p>
                        <p className="text-sm text-gray-500">{selectedGuard.time}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Gender</p>
                        <p className="text-sm text-gray-500">{selectedGuard.gender}</p>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="mt-5 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteDialogOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Delete Security?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this Security?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      </main>
    </div>
  )
}