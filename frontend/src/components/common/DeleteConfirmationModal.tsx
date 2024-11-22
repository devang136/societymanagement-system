import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { BaseDeleteModal, BaseDeleteModalProps } from './BaseDeleteModal';

export type DeleteConfirmationModalProps = Omit<BaseDeleteModalProps, 'icon' | 'variant' | 'customContent'>;

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = (props) => {
  return (
    <BaseDeleteModal
      {...props}
      icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
      variant="danger"
    />
  );
};

export default DeleteConfirmationModal;
