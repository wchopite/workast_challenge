const { Router } = require('express');

// TODO: add data input validation using AJV
module.exports = function({ ArticleController }) {
  this.ArticleController = ArticleController;
  const router = Router();

  router.get('/', this.ArticleController.getAll.bind(this.ArticleController));
  router.post('/', this.ArticleController.create.bind(this.ArticleController));
  router.put('/:id', this.ArticleController.update.bind(this.ArticleController));
  router.delete('/:id', this.ArticleController.remove.bind(this.ArticleController));

  return router;
};
