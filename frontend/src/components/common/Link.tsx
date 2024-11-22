import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className = '',
  activeClassName = 'bg-gray-100',
  icon,
  onClick,
}) => {
  return (
    <RouterLink
      to={href}
      className={cn(
        'flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors',
        className,
        window.location.pathname === href && activeClassName
      )}
      onClick={onClick}
    >
      {icon}
      {children}
    </RouterLink>
  );
};
