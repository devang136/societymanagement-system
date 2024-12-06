import React, { useEffect, useState } from 'react';
import { UserDetails, userService } from '../../../../../services/userService';
import { toast } from 'react-hot-toast';

export default function PersonalInfo() {
  const [activeTab, setActiveTab] = useState<'owner' | 'tenant'>('owner');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const data = await userService.getPersonalDetails();
      setUserDetails(data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      toast.error('Failed to load personal information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Tab Buttons */}
      <div className="flex space-x-2">
        <button
          className={`px-6 py-2 rounded-lg ${
            activeTab === 'owner'
              ? 'bg-white text-gray-900'
              : 'bg-gray-100 text-gray-500'
          }`}
          onClick={() => setActiveTab('owner')}
        >
          Owner
        </button>
        <button
          className={`px-6 py-2 rounded-lg ${
            activeTab === 'tenant'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-500'
          }`}
          onClick={() => setActiveTab('tenant')}
        >
          Tenant
        </button>
      </div>

      {/* Owner Information */}
      {activeTab === 'owner' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Owner Name</div>
            <div className="font-medium">Arlene McCoy</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Owner Phone</div>
            <div className="font-medium">+91 9575225165</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Owner Address</div>
            <div className="font-medium">C-101 Dhara Arcade, Mota Varacha Surat</div>
          </div>
        </div>
      )}

      {/* Personal Information Card */}
      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-4 gap-8">
          {/* Profile Image */}
          <div className="col-span-1">
            <img
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61"
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
          </div>

          {/* Personal Details */}
          <div className="col-span-3 grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Full Name</div>
              <div className="font-medium">Arlene McCoy</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Phone Number</div>
              <div className="font-medium">+91 99130 44537</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Email Address</div>
              <div className="font-medium">ArleneMcCoy25@gmail.com</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Gender</div>
              <div className="font-medium">Male</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Wing</div>
              <div className="font-medium">A</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Age</div>
              <div className="font-medium">20</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Unit</div>
              <div className="font-medium">1001</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Relation</div>
              <div className="font-medium">Father</div>
            </div>
          </div>
        </div>

        {/* Document Attachments */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center space-x-3">
              <div className="text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Syncfusion Essential Adhsrcard Front Side.JPG</div>
                <div className="text-sm text-gray-500">3.5 MB</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center space-x-3">
              <div className="text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Address Proof Front Side.PDF</div>
                <div className="text-sm text-gray-500">3.5 MB</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Member : (04)</h3>
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-blue-500 text-white rounded-lg p-4 space-y-3">
              <div className="font-medium">Arlene McCoy</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Email</span>
                  <span>Arlenemccoy@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone Number</span>
                  <span>+91 99130 52221</span>
                </div>
                <div className="flex justify-between">
                  <span>Age</span>
                  <span>22</span>
                </div>
                <div className="flex justify-between">
                  <span>Gender</span>
                  <span>Male</span>
                </div>
                <div className="flex justify-between">
                  <span>Relation</span>
                  <span>Brother</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicles Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Vehicle : (04)</h3>
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-blue-500 text-white rounded-lg p-4 space-y-3">
              <div className="font-medium">Two Wheelers</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Vehicle Name</span>
                  <span>Splendor</span>
                </div>
                <div className="flex justify-between">
                  <span>Vehicle Number</span>
                  <span>GJ-5216</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Details */}
      <div className="bg-white rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Show Maintenance Details</h3>
          <div className="flex space-x-6">
            <div className="text-green-600">
              <div className="text-sm">Maintenance Amount</div>
              <div className="text-xl font-medium">₹ 1,500</div>
            </div>
            <div className="text-red-600">
              <div className="text-sm">Penalty Amount</div>
              <div className="text-xl font-medium">₹ 500</div>
            </div>
          </div>
        </div>

        {/* Pending Maintenance */}
        <div className="space-y-4">
          <h4 className="font-medium">Pending Maintenance</h4>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
                  <span>Maintenance</span>
                  <span>Pending</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Bill Date</span>
                    <span>11/01/2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Pending Date</span>
                    <span>11/01/2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Maintenance Amount</span>
                    <span className="text-orange-500">1000.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Maintenance Penalty Amount</span>
                    <span className="text-orange-500">250.00</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Grand Total</span>
                    <span className="text-green-600">₹ 1,250</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-2 rounded-lg mt-2">
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Due Maintenance */}
        <div className="space-y-4">
          <h4 className="font-medium">Due Maintenance</h4>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
                  <span>Maintenance</span>
                  <span>Pending</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date</span>
                    <span>11/01/2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Amount</span>
                    <span className="text-orange-500">1000.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Due Maintenance Amount</span>
                    <span className="text-orange-500">250.00</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-2 rounded-lg mt-2">
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcement Details */}
        <div className="space-y-4">
          <h4 className="font-medium">Announcement Details</h4>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="bg-blue-500 text-white px-4 py-2">
                  <span>Community Initiatives</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Announcement Date</span>
                    <span>01/02/2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Announcement Time</span>
                    <span>10:15 AM</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 text-sm">Description</span>
                    <p className="text-sm">
                      The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}