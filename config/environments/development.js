module.exports = {
  server: {
    name: 'workast-dev',
    port: process.env.PORT || 8080
  },
  auth: {
    token: process.env.AUTH_TOKEN || '5CD4ED173E1C95FE763B753A297D5'
  },
  pagination: {
    limit: 20
  },
  logger: {}
};
