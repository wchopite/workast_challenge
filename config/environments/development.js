module.exports = {
  server: {
    name: 'workast-dev',
    port: process.env.PORT || 8080
  },
  auth: {
    token: process.env.AUTH_TOKEN
  },
  logger: {}
};
