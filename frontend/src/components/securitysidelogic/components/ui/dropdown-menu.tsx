import React, { useState, useRef, useEffect } from "react";

interface DropdownChildProps {
  isOpen?: boolean;
}

export const DropdownMenu = ({ 
  children, 
  onOpenChange 
}: { 
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  return (
    <div className="relative" onClick={() => setIsOpen(!isOpen)}>
      {React.Children.map(children, child => {
        if (React.isValidElement<DropdownChildProps>(child)) {
          return React.cloneElement(child, { isOpen });
        }
        return child;
      })}
    </div>
  );
};

export const DropdownMenuTrigger = ({ 
  children, 
  asChild,
  isOpen 
}: { 
  children: React.ReactNode; 
  asChild?: boolean;
  isOpen?: boolean;
}) => {
  return <div className="cursor-pointer">{children}</div>;
};

export const DropdownMenuContent = ({ 
  children, 
  className = "",
  isOpen = false
}: { 
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}) => {
  if (!isOpen) return null;
  return (
    <div className={`absolute z-10 mt-2 w-full rounded-md border border-gray-200 bg-white py-1 shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export const DropdownMenuItem = ({ 
  children, 
  onClick,
  className = ""
}: { 
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
