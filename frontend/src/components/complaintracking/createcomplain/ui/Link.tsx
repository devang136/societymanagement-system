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
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors ${
        active ? 'bg-orange-50 text-orange-500' : ''
      } ${className}`}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}