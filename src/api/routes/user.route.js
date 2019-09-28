const { Router } = require('express');

module.exports = function({ UserController }) {
  this.UserController = UserController;
  const router = Router();

  router.get('/', this.UserController.getAll.bind(this.UserController));
  router.post('/', this.UserController.create.bind(this.UserController));

  return router;
};
