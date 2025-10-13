const { Telegraf } = require("telegraf");
const BOT_TOKEN = process.env.BOT_TOKEN
const bot = new Telegraf(BOT_TOKEN);

export default {
  async beforeCreate(event) {
    console.log(event);
    
    const { data, where, select, populate } = event.params;
    if (data.publishedAt) return;
    const formattedDate = new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",

      minute: "2-digit",

      second: "2-digit",

      month: "short",

      day: "numeric",
    }).format(new Date(data.createdAt));
    console.log(formattedDate);
    const chatids = await strapi.entityService.findMany(
        //@ts-ignore
      "api::telegram-user.telegram-user",

      {}
    );

    console.log(chatids);

    for (let chat of chatids) {
      //@ts-ignore
      if (!chat.active) return;

      await bot.telegram

        .sendMessage(
          //@ts-ignore
          chat.userId,
          ` Запрошен обратный звонок с номера: \n ${data.phone_number}. \n Имя ${data.name}. \n Время запроса: \n ${formattedDate}`
        )

        .then((response) => {
          data.sended = true;
        })

        .catch((error) => {
          //   console.log(error);
        });
    }
  },
};
