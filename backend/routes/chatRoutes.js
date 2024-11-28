const express = require("express");
const { saveChat, getChats } = require("../controllers/chatController");
const router = express.Router();

// Route to save a chat message
router.post("/", saveChat);

// Route to get chat messages by room
router.get("/:roomId", getChats);

module.exports = router;
