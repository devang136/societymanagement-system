import { Shield, Users, LogOut } from "lucide-react";
import { cn } from "../lib/utils";
import React from "react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className={cn("w-64 bg-dashboard-sidebar h-screen p-4 flex flex-col", className)}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          <span className="text-primary">Dash</span>Stack
        </h1>
      </div>
      
      <div className="flex-1">
        <div className="bg-primary rounded-lg p-3 text-white mb-4 cursor-pointer">
          <div className="flex items-center gap-2">
            <Shield size={20} />
            <span>Security</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <div className="flex items-center gap-2 text-dashboard-text">
              <Users size={20} />
              <span>Visitor Tracking</span>
            </div>
          </div>
          
          <div 
            className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={() => navigate("/security/emergency")}
          >
            <div className="flex items-center gap-2 text-dashboard-text font-medium">
              <Shield size={20} />
              <span>Emergency Management</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
          <div className="flex items-center gap-2 text-red-500">
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;