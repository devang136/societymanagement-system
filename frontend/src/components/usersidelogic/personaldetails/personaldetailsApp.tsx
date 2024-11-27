import React, { useState } from 'react';
import { PersonalInfo } from './components/profile/PersonalInfo';
import { MemberCard } from './components/members/MemberCard';
import { MaintenanceCard } from './components/maintenance/MaintenanceCard';
import { VehicleCard } from './components/vehicles/VehicleCard';
import { MaintenanceOverview } from './components/maintenance/MaintenanceOverview';

export function PersonalDetailsApp() {
  const [isOwner, setIsOwner] = useState(true);

  const personalInfo = isOwner ? {
    fullName: "Arlene McCoy",
    phoneNumber: "+91 99130 44527",
    emailAddress: "ArleneMcCoy25@gmail.com",
    gender: "Male",
    wing: "A",
    age: 28,
    unit: "1001",
    relation: "Father"
  } : {
    fullName: "John Tenant",
    phoneNumber: "+91 99130 55527",
    emailAddress: "john.tenant@gmail.com",
    gender: "Male",
    wing: "A",
    age: 32,
    unit: "1001",
    relation: "Tenant"
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
   
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Personal Detail</h1>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsOwner(true)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isOwner 
                    ? 'bg-orange-500 text-white' 
                    : 'border hover:bg-gray-50'
                }`}
              >
                Owner
              </button>
              <button 
                onClick={() => setIsOwner(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !isOwner 
                    ? 'bg-orange-500 text-white' 
                    : 'border hover:bg-gray-50'
                }`}
              >
                Tenant
              </button>
            </div>
          </div>
          
          {/* Personal Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <PersonalInfo {...personalInfo} />
          </div>
          
          {/* Members */}
          <div>
            <h2 className="text-lg font-medium mb-4">Member : (04)</h2>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <MemberCard
                  key={i}
                  name="Arlene McCoy"
                  email="ArleneMcCoy@gmail.com"
                  phoneNumber="+91 99130 52231"
                  age={22}
                  gender="Male"
                  relation="Brother"
                />
              ))}
            </div>
          </div>

          {/* Vehicles */}
          <div>
            <h2 className="text-lg font-medium mb-4">Vehicle : (04)</h2>
            <div className="grid grid-cols-4 gap-4">
              <VehicleCard
                type="Two Wheelers"
                vehicleName="Splendor"
                vehicleNumber="GJ-5316"
              />
              <VehicleCard
                type="Four Wheelers"
                vehicleName="Fortuner"
                vehicleNumber="GJ-5316"
              />
              <VehicleCard
                type="Two Wheelers"
                vehicleName="Splendor"
                vehicleNumber="GJ-5316"
              />
              <VehicleCard
                type="Two Wheelers"
                vehicleName="Splendor"
                vehicleNumber="GJ-5316"
              />
            </div>
          </div>
          
          {/* Maintenance Overview */}
          <MaintenanceOverview maintenanceAmount={1500} penaltyAmount={500} />
          
          {/* Pending Maintenance */}
          <div>
            <h2 className="text-lg font-medium mb-4">Pending Maintenance</h2>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <MaintenanceCard
                  key={i}
                  type="Maintenance"
                  status="Pending"
                  billDate="11/01/2024"
                  pendingDate="11/01/2024"
                  amount={1000}
                  penaltyAmount={250}
                />
              ))}
            </div>
          </div>

          {/* Due Maintenance */}
          <div>
            <h2 className="text-lg font-medium mb-4">Due Maintenance</h2>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(2)].map((_, i) => (
                <MaintenanceCard
                  key={i}
                  type="Maintenance"
                  status="Due"
                  billDate="11/01/2024"
                  pendingDate="11/01/2024"
                  amount={1000}
                  penaltyAmount={250}
                />
              ))}
            </div>
          </div>

          {/* Announcement Details */}
          <div>
            <h2 className="text-lg font-medium mb-4">Announcement Details</h2>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="text-blue-600 font-medium mb-2">Community Initiatives</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span>01/02/2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time</span>
                      <span>10:15 AM</span>
                    </div>
                    <p className="text-gray-600 mt-2">
                      The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PersonalDetailsApp;