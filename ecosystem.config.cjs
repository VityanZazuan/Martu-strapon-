module.exports = {
  apps: [
    {
      name: "Strapi",
      script: "npm",
      args: "start",
      port: "1337",
    },
    {
      name:"Bot",
      script:"ts-node",
      args: "src/bot.ts",
    }
  ],
};
