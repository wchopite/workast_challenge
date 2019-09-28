module.exports = {
  development: {
    url: process.env.MONGODB_URL || 'mongodb://localhost/workast_dev'
  },
  test: {
    url: process.env.MONGODB_URL || 'mongodb://localhost/workast_test'
  },
  production: {
    url: process.env.MONGODB_URL
  }
};
