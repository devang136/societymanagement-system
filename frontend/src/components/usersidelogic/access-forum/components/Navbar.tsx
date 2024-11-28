import React from "react";

const Navbar = () => {
    return (
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 shadow-md">
        <div className="text-xl font-semibold">Access Forums</div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Moni Roy (Admin)</span>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  