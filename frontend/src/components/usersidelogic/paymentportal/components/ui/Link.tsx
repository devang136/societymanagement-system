import React, { ReactNode } from 'react';

interface LinkProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  active?: boolean;
}

export function Link({ href, children, icon, active }: LinkProps) {
  return (
    <a
      href={href}
      className={`flex items-center p-3 mb-2 rounded-lg hover:bg-gray-100 transition-colors ${
        active ? 'text-orange-500' : 'text-gray-700'
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </a>
  );
}