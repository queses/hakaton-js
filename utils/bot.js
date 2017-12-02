var TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот.
var token = '505525735:AAEZ7zfOk2jgnMflrFiiCodI3FoBOWLCo6A';
// Включить опрос сервера
var chatId;
var bot = new TelegramBot(token, {polling: true});
// bot.onText(/^\/start/, function (msg, match) {
//     chatId = msg.chat.id;
//     var option = {
//         "parse_mode": "Markdown",
//         "reply_markup": {
//             "one_time_keyboard": true,
//             "keyboard": [[{
//                 text: "Ваш номер телефона",
//                 request_contact: true
//             }], ["Cancel"]]
//         }
//     };
    
//     bot.sendMessage(msg.chat.id, "Как с вами связаться?", option).then(() => {
//         bot.once("contact",(msg)=>{
//             var option = {
//                 "parse_mode": "Markdown",
//                 "reply_markup": {
//                     "one_time_keyboard": true,
//                     "keyboard": [[{
//                         text: "Ваша геолокация",
//                         request_location: true
//                     }], ["Cancel"]]
//                 }
//             };
//             bot.sendMessage(msg.chat.id,
//                             util.format('Thank you %s with phone %s! And where are you?', msg.contact.first_name, msg.contact.phone_number),
//                             option)
//             .then(() => {
//                 bot.once("location",(msg)=>{
//                     bot.sendMessage(msg.chat.id, "We will deliver your order to " + [msg.location.longitude,msg.location.latitude].join(";"));
//                 })
//             })
//         })
//     })

// });
// bot.onText(/\hello, (msg, match) => {
//     // 'msg' is the received Message from Telegram
//     // 'match' is the result of executing the regexp above on the text content
//     // of the message
  
//     chatId = msg.chat.id;
  
//     // send back the matched "whatever" to the chat
//     bot.sendMessage(chatId, "resp");
//   });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
  
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
  });