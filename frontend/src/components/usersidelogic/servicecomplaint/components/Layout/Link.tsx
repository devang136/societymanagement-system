import React, { ReactNode } from 'react';

interface LinkProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  active?: boolean;
  className?: string;
}

export function Link({ href, icon, children, active, className = '' }: LinkProps) {
  return (
    <a
      href={href}
      className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors ${
        active ? 'bg-orange-50 text-orange-500' : 'text-gray-700'
      } ${className}`}
    >
      <span className="text-current">{icon}</span>
      <span>{children}</span>
    </a>
  );
}