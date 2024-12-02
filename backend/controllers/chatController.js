const { saveChatMessage, getChatMessagesByRoom } = require("../services/chatService");

// Controller to save a chat message
async function saveChat(req, res) {
  try {
    const chatData = req.body;
    const savedChat = await saveChatMessage(chatData);
    res.status(201).json(savedChat);
  } catch (error) {
    res.status(500).json({ error: "Failed to save chat message." });
  }
}

// Controller to fetch chat messages by room
async function getChats(req, res) {
  try {
    const roomId = req.params.roomId;
    const messages = await getChatMessagesByRoom(roomId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat messages." });
  }
}

module.exports = {
  saveChat,
  getChats,
};