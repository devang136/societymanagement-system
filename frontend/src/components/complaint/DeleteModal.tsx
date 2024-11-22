import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { BaseDeleteModal } from '../common/BaseDeleteModal';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Complaint',
  message = 'Are you sure you want to delete this complaint?'
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

export default DeleteModal;
