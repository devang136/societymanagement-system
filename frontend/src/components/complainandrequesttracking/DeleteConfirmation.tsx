import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { BaseDeleteModal } from '../common/BaseDeleteModal';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Confirmation',
  message = 'Are you sure you want to delete this item?'
}) => {
  return (
    <BaseDeleteModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      message={message}
      icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
      variant="danger"
      size="md"
    />
  );
};