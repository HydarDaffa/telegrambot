const express = require("express");
const router = express.Router();
const TelegramService = require("../services/telegramService");

const telegramService = new TelegramService();

// Send message endpoint
router.post("/sendMessage", async (req, res) => {
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
router.get("/me", async (req, res) => {
  try {
    const botInfo = await telegramService.bot.telegram.getMe();
    res.json({ success: true, bot: botInfo });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Get updates
router.get("/updates", async (req, res) => {
  const result = await telegramService.getUpdates();
  res.json(result);
});

module.exports = router;
