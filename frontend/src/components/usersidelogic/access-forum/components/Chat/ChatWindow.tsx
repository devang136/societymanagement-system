import React from "react";
import ChatMessage from "./ChatMessage";

const ChatWindow = () => {
  const messages = [
    { sender: "Arlene McCoy", text: "Hi there, How are you?", time: "9:20 PM" },
    {
      sender: "You",
      text: "Hi, I am coming there in a few minutes. Please wait!! I am in a taxi right now.",
      time: "9:30 PM",
    },
    { sender: "Arlene McCoy", image: true, time: "9:45 PM" },
    { sender: "You", file: true, time: "10:00 PM" },
  ];

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex-grow bg-white p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-grow p-2 border rounded-lg"
          />
          <button className="p-2 bg-blue-500 text-white rounded-lg">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
