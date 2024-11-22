import React from 'react';

interface Vehicle {
  type: string;
  name: string;
  number: string;
}

interface VehicleCountingFormProps {
  vehicles: Vehicle[];
  onChange: (vehicles: Vehicle[]) => void;
}

export function VehicleCountingForm({ vehicles = [], onChange }: VehicleCountingFormProps) {
  const handleAddVehicle = () => {
    onChange([...vehicles, { type: '', name: '', number: '' }]);
  };

  const handleVehicleChange = (index: number, field: keyof Vehicle, value: string) => {
    const updatedVehicles = vehicles.map((vehicle, i) => 
      i === index ? { ...vehicle, [field]: value } : vehicle
    );
    onChange(updatedVehicles);
  };

  return (
    <div className="space-y-4">
      {vehicles.map((vehicle, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <select
              value={vehicle.type}
              onChange={(e) => handleVehicleChange(index, 'type', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Vehicle Type</option>
              <option value="two-wheeler">Two Wheeler</option>
              <option value="four-wheeler">Four Wheeler</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Vehicle Name"
              value={vehicle.name}
              onChange={(e) => handleVehicleChange(index, 'name', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Vehicle Number"
              value={vehicle.number}
              onChange={(e) => handleVehicleChange(index, 'number', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAddVehicle}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          + Select Vehicle
        </button>
      </div>
    </div>
  );
}