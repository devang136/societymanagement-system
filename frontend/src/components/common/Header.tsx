import React from 'react';

interface HeaderProps {
  title: string;
  onCreateClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onCreateClick }) => {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <button
            onClick={onCreateClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Create Facility
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
