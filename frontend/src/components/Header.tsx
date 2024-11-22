import React from 'react';

export interface HeaderProps {
  title?: string;
  onCreateClick?: () => void;
  user?: {
    name: string;
    image: string;
    role?: string;
  };
  userName?: string;
  userImage?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onCreateClick,
  user,
  userName,
  userImage
}) => {
  const displayName = user?.name || userName;
  const displayImage = user?.image || userImage;
  const displayRole = user?.role;

  return (
    <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow">
      <div className="flex items-center">
        {title && <h1 className="text-2xl font-bold text-gray-800">{title}</h1>}
      </div>
      <div className="flex items-center space-x-4">
        {onCreateClick && (
          <button
            onClick={onCreateClick}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create New
          </button>
        )}
        <div className="flex items-center space-x-3">
          {displayImage && (
            <img
              className="h-8 w-8 rounded-full"
              src={displayImage}
              alt={displayName || "User"}
            />
          )}
          <div>
            {displayName && (
              <p className="text-sm font-medium text-gray-700">{displayName}</p>
            )}
            {displayRole && (
              <p className="text-xs text-gray-500">{displayRole}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
