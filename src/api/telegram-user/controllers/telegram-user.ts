// import { factories } from '@strapi/strapi'
// import { Context } from 'koa'

// interface TelegramUserData {
//   userId: number
//   userName?: string | null

// }

// export default factories.createCoreController('api::telegram-user.telegram-user', ({ strapi }) => ({
//   async register(ctx: Context) {
//     console.log('register-handler');
//     console.log( ctx.request.body);

//     try {
//       const { userId, userName } = ctx.request.body as TelegramUserData

//       if (!userId) {
//         return ctx.badRequest('userId is required')
//       }

//       // Проверка существования

//       const existing = await strapi.db.query('api::telegram-user.telegram-user').findOne({
//         where: { userId },
//       })
//       console.log('existing');

//       console.log(existing);

//       if (existing) {
//         return ctx.send({ message: 'User already exists', data: existing })
//       }

//       // Создание нового пользователя
//       const newUser = await strapi.db.query('api::telegram-user.telegram-user').create({
//         data: { userId, userName},
//       })

//       return ctx.send({ message: 'User registered', data: newUser })
//     } catch (error) {
//       strapi.log.error('Telegram register error:', error)
//       return ctx.internalServerError('Something went wrong')
//     }
//   },
// }))
import { factories } from "@strapi/strapi";
import { Context } from "koa";

interface TelegramUserData {
  userId: number;
  userName?: string | null;
}

export default factories.createCoreController(
  "api::telegram-user.telegram-user",
  ({ strapi }) => ({
    async register(ctx: Context) {
      console.log(ctx.request.body);

      try {
        const { userId, userName } = ctx.request.body as TelegramUserData;
        // if (userName !== "vtunems") return;
        if (!userId) {
          return ctx.badRequest("userId is required");
        }

        const existing = await strapi.db
          .query("api::telegram-user.telegram-user")
          .findOne({
            where: { userId },
          });

        if (existing) {
          return ctx.send({ message: "User already exists", data: existing });
        }

        // ✅ Используем entityService — запись появится в интерфейсе
        const newUser = await strapi.entityService.create(
          "api::telegram-user.telegram-user",
          {
            data: {
              userId,
              userName,
              publishedAt: new Date(), // если используется draft/publish
            },
          }
        );

        return ctx.send({ message: "User registered", data: newUser });
      } catch (error) {
        strapi.log.error("Telegram register error:", error);
        return ctx.internalServerError("Something went wrong");
      }
    },
  })
);
