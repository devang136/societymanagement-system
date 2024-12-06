import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: any) => void;
  onClose: () => void;
}

export function EmojiPicker({ onEmojiSelect, onClose }: EmojiPickerProps) {
  return (
    <div className="absolute bottom-full mb-2">
      <div className="relative">
        <div className="fixed inset-0" onClick={onClose} />
        <div className="relative z-50">
          <Picker
            data={data}
            onEmojiSelect={onEmojiSelect}
            theme="light"
            set="native"
          />
        </div>
      </div>
    </div>
  );
}