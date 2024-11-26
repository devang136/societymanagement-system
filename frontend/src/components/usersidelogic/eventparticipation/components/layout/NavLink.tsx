import React from 'react';
import { cn } from '../../utils/cn';

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  className?: string;
}

const NavLink = ({ icon, label, href, active, className }: NavLinkProps) => {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors',
        active && 'bg-orange-50 text-orange-500',
        className
      )}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

export default NavLink;