module.exports = {
  server: {
    name: 'workast-prod',
    port: process.env.PORT
  },
  auth: {
    token: process.env.AUTH_TOKEN
  },
  logger: {}
};
