
require('dotenv').config();

const CronJob = require('cron').CronJob;
import { Telegraf } from 'telegraf';
import getCurrencyPrice from './requester';
import formatter from './formatter';

const BOT_TOKEN: string = process.env.BOT_TOKEN || '';
const CRON = process.env.CRON || '';
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  try {
    const job = new CronJob(CRON, async function() {
      const response = await getCurrencyPrice();
      ctx.reply(await formatter(response));
    }, null, true, 'America/Los_Angeles');
    job.start();
  } catch (err) {
    console.error(err);
  }
});

bot.command('quit', (ctx) => {

  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  ctx.leaveChat()
})

bot.launch(); // starting bot

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));