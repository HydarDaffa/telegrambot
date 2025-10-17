const express = require("express");
const cors = require("cors");
require("dotenv").config();

const TelegramService = require("./src/services/TelegramService"); // ✅ PascalCase

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Telegram bot
const telegramService = new TelegramService(); // ✅ No parameters
telegramService.startBot();

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Telegram HTTP API",
    timestamp: new Date().toISOString(),
  });
});

// Send message endpoint
app.post("/send", async (req, res) => {
  const { chatId, text } = req.body;

  if (!chatId || !text) {
    return res.status(400).json({
      success: false,
      error: "chatId and text are required",
    });
  }

  const result = await telegramService.sendMessage(chatId, text);
  res.json(result);
});

// Get bot info
app.get("/me", async (req, res) => {
  const result = await telegramService.getMe();
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
