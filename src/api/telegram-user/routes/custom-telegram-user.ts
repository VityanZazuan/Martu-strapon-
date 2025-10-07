export default {
  routes: [
    {
      method: 'POST',
      path: '/telegram_users/register',
      handler: 'telegram-user.register',
      config: {
        auth: false,
      },
    },
  ],
}