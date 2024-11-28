const Chat = require("../models/chatModel");

// Save chat message
async function saveChatMessage(chatData) {
  const chatMessage = new Chat(chatData);
  return await chatMessage.save();
}

// Fetch chat messages by room
async function getChatMessagesByRoom(roomId) {
  return await Chat.find({ roomId }).sort({ timestamp: 1 });
}

module.exports = {
  saveChatMessage,
  getChatMessagesByRoom,
};
