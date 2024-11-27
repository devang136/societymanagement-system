import React from 'react';

interface MemberCardProps {
  name: string;
  email: string;
  phoneNumber: string;
  age: number;
  gender: string;
  relation: string;
}

export function MemberCard({
  name,
  email,
  phoneNumber,
  age,
  gender,
  relation,
}: MemberCardProps) {
  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <h3 className="text-blue-600 font-medium mb-3">{name}</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Email</span>
          <span>{email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phone Number</span>
          <span>{phoneNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Age</span>
          <span>{age}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Gender</span>
          <span>{gender}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Relation</span>
          <span>{relation}</span>
        </div>
      </div>
    </div>
  );
}