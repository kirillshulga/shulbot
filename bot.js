
"use strict";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};

const CronJob = require('cron').CronJob;
const { Telegraf } = require('telegraf');
const requester = require('./requester');
const formatter = require('./formatter');

const bot = new Telegraf(process.env.BOT_TOKEN); //сюда помещается токен, который дал botFather

bot.start((ctx) => {
    const job = new CronJob('*/10 * * * * *', function() {
        const response = requester.getQuoteCurrency();
        response.then((value) => {
            ctx.reply(`name: ${value.body.data[0].name}, USD price: ${value.body.data[0].quote.USD.price}`);
            console.log(value.body.data[0].quote.USD);
        })
        // ctx.reply('You will see this message every 10second');
        // console.log('You will see this message every 10second');
      }, null, true, 'America/Los_Angeles');
      job.start();
    // ctx.reply('Welcome');
}); //ответ бота на команду /start
// bot.help((ctx) => ctx.reply('Send me a sticker')); //ответ бота на команду /help
bot.command('quit', (ctx) => {
    // Explicit usage
    ctx.telegram.leaveChat(ctx.message.chat.id)
  
    // Using context shortcut
    ctx.leaveChat()
  })
// bot.on('sticker', (ctx) => ctx.reply('')); //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
// bot.hears('hi', (ctx) => ctx.reply('Hey there')); // bot.hears это обработчик конкретного текста, данном случае это - "hi"
bot.launch(); // запуск бота

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))