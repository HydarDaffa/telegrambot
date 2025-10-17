const { Telegraf } = require("telegraf");

class TelegramService {
  constructor() {
    this.bot = new Telegraf(process.env.BOT_TOKEN);
    this.setupHandlers();
  }

  setupHandlers() {
    // Handle start command
    this.bot.start((ctx) => {
      ctx.reply("Welcome! Bot is connected to HTTP API");
    });

    // Handle incoming messages
    this.bot.on("text", (ctx) => {
      console.log(
        "Received message from",
        ctx.from.username,
        ":",
        ctx.message.text
      );
    });
  }

  // Method untuk kirim message via HTTP API
  async sendMessage(chatId, text) {
    try {
      await this.bot.telegram.sendMessage(chatId, text);
      return {
        success: true,
        message: "Message sent successfully",
        chatId: chatId,
        text: text,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Method untuk get bot info
  async getMe() {
    try {
      const botInfo = await this.bot.telegram.getMe();
      return {
        success: true,
        bot: botInfo,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  startBot() {
    this.bot.launch();
    console.log("🤖 Telegram Bot is running...");
  }
}

module.exports = TelegramService;
