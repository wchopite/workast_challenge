const checkToken = require('./checkToken.middleware');
const swaggerMiddleware = require('./swagger/swagger.middleware');

module.exports = {
  checkToken,
  swaggerMiddleware
};
