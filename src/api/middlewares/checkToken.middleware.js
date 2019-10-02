const config = require('../../../config/config');

module.exports = (req, res, next) => {
  const token = (req.headers.authorization) ?
    req.headers.authorization.split(' ')[1] :
    null;

  if(config.auth.token !== token) {
    res.status(401).json({ message: 'Auth failed' });
    return;
  }

  next();
};
