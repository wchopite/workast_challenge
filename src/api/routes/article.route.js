const { Router } = require('express');
const { checkToken } = require('../middlewares/middlewares');

// TODO: add data input validation using AJV
module.exports = function({ArticleController}) {
  this.ArticleController = ArticleController;
  const router = Router();

  router.get('/', checkToken, this.ArticleController.getAll.bind(this.ArticleController));
  router.get('/byTags/:tags', checkToken, this.ArticleController.getByTags.bind(this.ArticleController));
  router.post('/', checkToken, this.ArticleController.create.bind(this.ArticleController));
  router.put('/:id', checkToken, this.ArticleController.update.bind(this.ArticleController));
  router.delete('/:id', checkToken, this.ArticleController.remove.bind(this.ArticleController));

  return router;
};
