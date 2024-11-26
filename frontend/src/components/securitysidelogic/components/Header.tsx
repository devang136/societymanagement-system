import { Bell, ChevronRight } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-2 text-dashboard-text">
        <span className="text-gray-500">Home</span>
        <ChevronRight size={16} className="text-gray-400" />
        <span>Emergency Management</span>
      </div>

      <div className="flex items-center gap-6">
        <Bell className="text-gray-500 cursor-pointer" />
        <div className="flex items-center gap-3">
          <img
            src="https://ui-avatars.com/api/?name=Moni+Roy"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-right">
            <div className="text-sm font-medium">Moni Roy</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;