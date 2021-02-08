
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
    const job = new CronJob('*/6 * * * * *', function() {
        const response = requester.getQuoteCurrency();
        response.then((value) => {
            ctx.reply(formatter.formatArrayToMessage(value.body.data));
        })
      }, null, true, 'America/Los_Angeles');
      job.start();
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