module.exports = {
  apps: [
    {
      name: "CSlant Docs",
      script: "npx docusaurus serve",
      env: {
        PORT: 3001,
        HOST: "127.0.0.1",
      },
    },
  ],
};
