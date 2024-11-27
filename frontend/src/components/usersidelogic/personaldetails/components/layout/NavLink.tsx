import React from 'react';
import { cn } from '../../utils/cn';

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  className?: string;
}

export function NavLink({ icon, label, isActive, className }: NavLinkProps) {
  return (
    <a
      href="#"
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors',
        isActive && 'bg-orange-50 text-orange-500',
        className
      )}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}