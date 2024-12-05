import React, { useRef } from 'react';
import { File } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

export function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useChatContext();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !state.activeContact) return;

  
    const fileUrl = URL.createObjectURL(file);

    const newMessage = {
      id: Date.now(),
      senderId: state.currentUser.id,
      content: `Sent a file: ${file.name}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      file: {
        name: file.name,
        url: fileUrl,
        type: file.type,
        size: file.size,
      },
    };

    dispatch({
      type: 'ADD_MESSAGE',
      payload: { contactId: state.activeContact.id, message: newMessage },
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept="image/*,.pdf,.doc,.docx,.txt"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <File className="w-6 h-6 text-gray-600" />
      </button>
    </>
  );
}