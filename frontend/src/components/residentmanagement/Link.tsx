import React from 'react';

interface LinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  className?: string;
}

export function Link({ href, icon, text, active, className = '' }: LinkProps) {
  return (
    <a
      href={href}
      className={`
        flex items-center px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500
        ${active ? 'bg-orange-500 text-white hover:bg-orange-600 hover:text-white' : ''}
        ${className}
      `}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </a>
  );
}