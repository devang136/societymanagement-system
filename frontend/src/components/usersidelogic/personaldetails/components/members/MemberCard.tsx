import React from 'react';

interface MemberCardProps {
  name: string;
  email: string;
  phoneNumber: string;
  age: number;
  gender: string;
  relation: string;
}

interface MemberCardProps {
  name: string;
  email: string;
  phoneNumber: string;
  age: number;
  gender: string;
  relation: string;
}

export const MemberCard: React.FC<MemberCardProps> = (props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
      <h3 className="font-medium">{props.name}</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Email</span>
          <span>{props.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Phone</span>
          <span>{props.phoneNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Age</span>
          <span>{props.age}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Gender</span>
          <span>{props.gender}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Relation</span>
          <span>{props.relation}</span>
        </div>
      </div>
    </div>
  );
};