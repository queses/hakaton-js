'use strict'

const TelegramBot = require('node-telegram-bot-api');
const db = require('./get_db')
const Response = require('../models/response') 

// Устанавливаем токен, который выдавал нам бот.
var token = '505525735:AAEZ7zfOk2jgnMflrFiiCodI3FoBOWLCo6A';
// Включить опрос сервера
var chatId;
var bot = new TelegramBot(token, {polling: true});

bot.onText(/^\/start/, function (msg, match) {
  chatId = msg.chat.id;
  var option = {
      "parse_mode": "Markdown",
      "reply_markup": {
          "one_time_keyboard": true,
          "keyboard": [[{
              text: "Ваш номер телефона",
              request_contact: true
          }], ["Cancel"]]
      }
  };
  
  bot.sendMessage(msg.chat.id, "Как с вами связаться?", option).then(() => {
      bot.once("contact", async (msg)=>{
        console.log(msg)
        bot.sendMessage(msg.chat.id,
            `Спасибо за регистрацию, ${msg.contact.first_name} ${msg.contact.phone_number}!`
        ).then(() => {
        })
        const res = await db.update({ _cat: 'user', phone: '8' + msg.contact.phone_number.substr(1) }, { chatId: msg.chat.id })
        console.log(res)
      })

  })
})

// });
// bot.onText(/\hello, (msg, match) => {
//     // 'msg' is the received Message from Telegram
//     // 'match' is the result of executing the regexp above on the text content
//     // of the message
  
//     chatId = msg.chat.id;
  
//     // send back the matched "whatever" to the chat
//     bot.sendMessage(chatId, "resp");
//   });

bot.on('message', async (msg) => {
//   console.log(msg.text)
  const chatId = msg.chat.id
  const user = await db.findOne({ _cat: 'user', chatId: chatId.toString() })
  if (user) {
    let response = new Response(msg.text, user._id)
    await db.insert({ _cat: 'response', ...response })
  } else {
    bot.sendMessage(chatId, 'Для оставления отзыва необходимо зарегистрироваться');
  }
});

module.exports = bot