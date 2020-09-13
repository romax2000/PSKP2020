const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1282467354:AAHJTxQOkuN1xaMXmBGuH_SslM5j6MqhOrI';

// Create a bot that uses 'polling' to fetch new updates
//
//const bot = new TelegramBot(token, {polling: true});
const bot = new TelegramBot(token, {polling: {interval: 8000, autostart: true, params: {limit: 3}}});

// Matches "/echo [whatever]"
bot.onText(/(.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, 'echo: ' + resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, 'Received your message');
// });
