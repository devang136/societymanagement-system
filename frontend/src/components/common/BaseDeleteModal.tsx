import React from 'react';
import { Dialog } from '../ui/dialog';
import { X } from 'lucide-react';

export interface BaseDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  itemType?: string;
  itemName?: string;
  icon?: React.ReactNode;
  customContent?: React.ReactNode;
  variant?: 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

export const BaseDeleteModal: React.FC<BaseDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Confirmation',
  message = 'Are you sure you want to delete this item?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  itemType = 'item',
  itemName,
  icon,
  customContent,
  variant = 'danger',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  const variantClasses = {
    danger: 'bg-red-600 hover:bg-red-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className={`bg-white rounded-lg shadow-lg w-full mx-4 ${sizeClasses[size]}`}>
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              {icon && <div className="flex-shrink-0">{icon}</div>}
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            {customContent || (
              <>
                <p className="text-gray-600">
                  {itemName 
                    ? `Are you sure you want to delete ${itemType} "${itemName}"?` 
                    : message}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </>
            )}
          </div>
          
          <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-white rounded-lg transition-colors ${variantClasses[variant]}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
