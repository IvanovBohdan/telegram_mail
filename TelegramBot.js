const TelegramBot = require("node-telegram-bot-api");
const config = require("./config.js");
const token = config.telegramToken;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
    bot.sendMessage(msg.chat.id, "ok");
    console.log(msg);
});

module.exports = { bot };
