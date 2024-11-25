import React from 'react';
import { Dialog } from '@headlessui/react';
import { FiX } from 'react-icons/fi';

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Array<{
    id: number;
    title: string;
    message: string;
    time: string;
    type: 'maintenance' | 'complaint' | 'update';
  }>;
}

export function Notification({ isOpen, onClose, notifications }: NotificationProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-start justify-end p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md mt-16 mr-4">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-lg font-semibold">
              Notification
            </Dialog.Title>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-200">
                  <path d="M120 180c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" fill="currentColor" opacity="0.2"/>
                  <path d="M135 95c0 8.284-6.716 15-15 15s-15-6.716-15-15 6.716-15 15-15 15 6.716 15 15z" fill="currentColor"/>
                  <path d="M120 120c-19.33 0-35 15.67-35 35h70c0-19.33-15.67-35-35-35z" fill="currentColor"/>
                  <path d="M150 70h-60M150 80h-60M150 90h-60" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-gray-500">No notification yet!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{notification.title}</h3>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
              ))}
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
// Notification dashboard file 