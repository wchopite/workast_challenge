module.exports = {
  server: {
    name: 'workast-test',
    port: process.env.PORT
  },
  auth: {
    token: process.env.AUTH_TOKEN
  },
  pagination: {
    limit: 20
  },
  logger: {}
};
