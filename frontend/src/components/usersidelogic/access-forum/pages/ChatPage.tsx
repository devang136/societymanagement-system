import Navbar from "../components/Navbar";
import ChatSidebar from "../components/Chat/ChatSidebar";
import ChatWindow from "../components/Chat/ChatWindow";
import React from "react";

const ChatPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <ChatSidebar />
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;
