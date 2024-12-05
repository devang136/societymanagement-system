import React, { useState } from 'react';
import { Smile, Send } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';
import { FileUpload } from './FileUpload';
import { EmojiPicker } from './EmojiPicker';

export function ChatInput() {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { state, dispatch } = useChatContext();

  const handleSendMessage = () => {
    if (!message.trim() || !state.activeContact) return;

    const newMessage = {
      id: Date.now(),
      senderId: state.currentUser.id,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    dispatch({
      type: 'ADD_MESSAGE',
      payload: { contactId: state.activeContact.id, message: newMessage },
    });

    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="border-t border-gray-200 px-6 py-4">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Smile className="w-6 h-6 text-gray-600" />
          </button>
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              onClose={() => setShowEmojiPicker(false)}
            />
          )}
        </div>
        <FileUpload />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
        >
          <Send className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}