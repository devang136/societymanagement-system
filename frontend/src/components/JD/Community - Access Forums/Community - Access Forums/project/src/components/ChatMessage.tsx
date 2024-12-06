import React from 'react';
import { FileText, Download } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

interface ChatMessageProps {
  id: number;
  content: string;
  timestamp: string;
  senderId: number;
  image?: string;
  file?: {
    name: string;
    url: string;
    type: string;
    size: number;
  };
}

export function ChatMessage({ content, timestamp, senderId, image, file }: ChatMessageProps) {
  const { state } = useChatContext();
  const isOwn = senderId === state.currentUser.id;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + ' KB';
    const mb = kb / 1024;
    return mb.toFixed(1) + ' MB';
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] ${
          isOwn ? 'bg-blue-500 text-white' : 'bg-gray-100'
        } rounded-lg px-4 py-2`}
      >
        {image && (
          <img src={image} alt="Chat attachment" className="rounded-lg mb-2 max-w-full" />
        )}
        {file && (
          <div className="flex items-center space-x-3 mb-2 p-3 bg-white bg-opacity-10 rounded">
            <FileText className={`w-8 h-8 ${isOwn ? 'text-white' : 'text-gray-600'}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs opacity-75">{formatFileSize(file.size)}</p>
            </div>
            <a
              href={file.url}
              download={file.name}
              className={`p-2 rounded-full ${
                isOwn ? 'hover:bg-white hover:bg-opacity-10' : 'hover:bg-gray-200'
              }`}
            >
              <Download className={`w-5 h-5 ${isOwn ? 'text-white' : 'text-gray-600'}`} />
            </a>
          </div>
        )}
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
          {timestamp}
        </p>
      </div>
    </div>
  );
}