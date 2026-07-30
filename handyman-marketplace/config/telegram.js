// config/telegram.js
// Telegram bot initialization using Telegraf.

const { Telegraf } = require("telegraf");

// Get token from environment variables
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("❌ TELEGRAM_BOT_TOKEN is missing in .env");
} else {
  console.log(
    "✅ Telegram bot token found (starts with:",
    token.substring(0, 10) + "...)",
  );
}

// Create bot instance
const bot = new Telegraf(token);

// Global error handler for the bot
bot.catch((err, ctx) => {
  console.error("⚠️ Telegram bot global error:", err.message);
});

module.exports = bot;
