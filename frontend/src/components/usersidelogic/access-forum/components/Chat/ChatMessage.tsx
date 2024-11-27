import React from "react";

const ChatMessage = ({ message }: { message: any }) => {
    return (
      <div className="flex items-start space-x-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div>
          {message.image ? (
            <img
              src="https://via.placeholder.com/150"
              alt="Image"
              className="w-40 h-40 object-cover rounded-lg"
            />
          ) : message.file ? (
            <div className="p-4 bg-gray-100 border rounded-lg">
              <span className="text-blue-500 underline">PDF (2.3 MB)</span>
            </div>
          ) : (
            <p className="bg-gray-100 p-2 rounded-lg">{message.text}</p>
          )}
          <span className="text-xs text-gray-400">{message.time}</span>
        </div>
      </div>
    );
  };
  
  export default ChatMessage;
  