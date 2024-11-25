import { LucideIcon } from 'lucide-react';
import React from 'react';

interface LinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  active?: boolean;
}

export function Link({ href, icon: Icon, children, active }: LinkProps) {
  return (
    <a 
      href={href}
      className={`flex items-center space-x-2 p-2 rounded-lg ${
        active 
          ? 'bg-orange-500 text-white' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      <span>{children}</span>
    </a>
  );
}