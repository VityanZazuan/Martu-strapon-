module.exports = {
  apps: [
    {
      name: "Strapi",
      script: "npm",
      args: "start",
      port: "1337",
    },
    {
      name: "Bot",
      script: "npx",
      args: "ts-node src/bot.ts",
      interpreter: "none",
    },
  ],
};
