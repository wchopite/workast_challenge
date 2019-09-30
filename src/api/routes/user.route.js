const { Router } = require('express');
const { checkToken } = require('../middlewares/middlewares');

module.exports = function({ UserController }) {
  this.UserController = UserController;
  const router = Router();

  router.get('/', checkToken, this.UserController.getAll.bind(this.UserController));
  router.post('/', checkToken, this.UserController.create.bind(this.UserController));

  return router;
};
