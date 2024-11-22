import React from 'react';

interface Member {
  fullName: string;
  phoneNo: string;
  email: string;
  age: string;
  gender: string;
  relation: string;
}

interface MemberCountingFormProps {
  members: Member[];
  onChange: (members: Member[]) => void;
}

export function MemberCountingForm({ members = [], onChange }: MemberCountingFormProps) {
  const handleAddMember = () => {
    onChange([
      ...members,
      { fullName: '', phoneNo: '', email: '', age: '', gender: '', relation: '' }
    ]);
  };

  const handleMemberChange = (index: number, field: keyof Member, value: string) => {
    const updatedMembers = members.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    );
    onChange(updatedMembers);
  };

  return (
    <div className="space-y-4">
      {members.map((member, index) => (
        <div key={index} className="grid grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={member.fullName}
              onChange={(e) => handleMemberChange(index, 'fullName', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone No"
              value={member.phoneNo}
              onChange={(e) => handleMemberChange(index, 'phoneNo', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={member.email}
              onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Age"
              value={member.age}
              onChange={(e) => handleMemberChange(index, 'age', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <select
              value={member.gender}
              onChange={(e) => handleMemberChange(index, 'gender', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <select
              value={member.relation}
              onChange={(e) => handleMemberChange(index, 'relation', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Relation</option>
              <option value="spouse">Spouse</option>
              <option value="child">Child</option>
              <option value="parent">Parent</option>
              <option value="sibling">Sibling</option>
            </select>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAddMember}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          + Select Member
        </button>
      </div>
    </div>
  );
}