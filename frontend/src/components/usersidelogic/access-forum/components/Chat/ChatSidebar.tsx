import React from "react";

const ChatSidebar = () => {
    const users = [
      { name: "Michael John", time: "10:27" },
      { name: "Elizabeth Sarah", time: "9:20" },
      { name: "Jenny Wilson", time: "7:00" },
      { name: "Arlene McCoy", time: "9:20", typing: true },
      { name: "Esther Howard", time: "10:27" },
      { name: "Cody Fisher", time: "7:00" },
    ];
  
    return (
      <div className="w-1/4 bg-gray-50 border-r p-4">
        <h3 className="text-lg font-semibold mb-4">Chat</h3>
        <div className="space-y-4">
          {users.map((user, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2 rounded-lg ${
                user.typing ? "bg-gray-200" : ""
              }`}
            >
              <div>
                <h4 className="font-medium">{user.name}</h4>
                <p className="text-sm text-gray-500">{user.typing ? "Typing..." : ""}</p>
              </div>
              <span className="text-sm text-gray-400">{user.time}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ChatSidebar;
  