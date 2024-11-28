import React from 'react';

interface PersonalInfoProps {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  gender: string;
  wing: string;
  age: number;
  unit: string;
  relation: string;
}

export function PersonalInfo({
  fullName,
  phoneNumber,
  emailAddress,
  gender,
  wing,
  age,
  unit,
  relation,
}: PersonalInfoProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <InfoField label="Full Name" value={fullName} />
      <InfoField label="Phone Number" value={phoneNumber} />
      <InfoField label="Email Address" value={emailAddress} />
      <InfoField label="Gender" value={gender} />
      <InfoField label="Wing" value={wing} />
      <InfoField label="Age" value={age.toString()} />
      <InfoField label="Unit" value={unit} />
      <InfoField label="Relation" value={relation} />
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}