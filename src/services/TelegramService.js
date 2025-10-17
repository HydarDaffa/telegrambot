const { Telegraf } = require("telegraf");

class TelegramService {
  constructor() {
    this.bot = new Telegraf(process.env.BOT_TOKEN);
    this.setupHandlers();
  }

  setupHandlers() {
    this.bot.start((ctx) => {
      ctx.reply("Welcome! Bot is connected to HTTP API ✅");
    });

    this.bot.on("text", (ctx) => {
      console.log("📨 Received:", ctx.message.text);
      ctx.reply(`You said: ${ctx.message.text}`);
    });
  }

  async sendMessage(chatId, text) {
    try {
      await this.bot.telegram.sendMessage(chatId, text);
      return {
        success: true,
        message: "Message sent ✅",
        chatId,
        text,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getMe() {
    try {
      const botInfo = await this.bot.telegram.getMe();
      return { success: true, bot: botInfo };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  startBot() {
    this.bot.launch();
    console.log("🤖 Telegram Bot Started...");
  }
}

module.exports = TelegramService;
