import { Telegraf, Context } from 'telegraf'
import axios from 'axios'
import dotenv from 'dotenv'
import { log } from 'node:console'

dotenv.config()

const BOT_TOKEN = process.env.BOT_TOKEN as string
const STRAPI_URL = process.env.STRAPI_URL 

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not defined in .env')
}

const bot = new Telegraf(BOT_TOKEN)

interface TelegramUserPayload {
  userId: number
  userName?: string | null

}

// Обработчик /start
bot.start(async (ctx: Context) => {
  const user = ctx.from
  console.log(user);
  
  if (!user) return ctx.reply('Ошибка: не удалось получить данные пользователя.')

  const payload: TelegramUserPayload = {
    userId: user.id,
    userName: user.username ?? null,

  }
  console.log(payload);
  
  try {
    const { data } =  await axios.post(`${STRAPI_URL}/api/telegram_users/register`, payload)
    console.log(data);
    console.log(data.message);
    if (data.message === 'User already exists') {
     await ctx.reply('Вы уже зарегистрированы ')
     await ctx.sendSticker(
      'CAACAgIAAxkBAAK4C2jlh1avjXhjj8t7iWdpSDRkCwSHAAINdgACGKvIS2S6sOe699C1NgQ'
     )
      return;
    }
    await ctx.reply('👋 Добро пожаловать! Вы успешно зарегистрированы. Ждите одобрения администратора')
  } catch (error: any) {
    console.error('Ошибка при запросе к Strapi:')
    await ctx.reply('⚠️ Произошла ошибка при регистрации. Попробуйте позже.')
  }
})

// Запуск бота
bot.launch().then(() => console.log('✅ Telegram bot started'))
