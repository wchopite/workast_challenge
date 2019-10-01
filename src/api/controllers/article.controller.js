const ArticleController = function ArticleController({ArticleApp}) {
  this.ArticleApp = ArticleApp;
};

// TODO: add a wrap to manage errors
ArticleController.prototype = {
  async getAll(req, res, next) {
    const {skip, limit} = req.query;

    try {
      const articles = await this.ArticleApp.getAll({options: {skip, limit}});
      res.status(200).json(articles);
    } catch(err) {
      next(err);
    }
  },
  async create(req, res, next) {
    const {body} = req;

    try {
      const response = await this.ArticleApp.create({article: body});
      res.status(201).json({article: response});
    } catch(err) {
      next(err);
    }
  },
  async update(req, res, next) {
    const {id} = req.params;
    const {body} = req;

    try {
      const response = await this.ArticleApp.update({id, article: body});
      res.json(response);
    } catch(err) {
      next(err);
    }
  },
  async remove(req, res, next) {
    const {id} = req.params;

    try {
      const response = await this.ArticleApp.remove({id});
      res.json(response);
    } catch(err) {
      next(err);
    }
  },
  async getByTags(req, res, next) {
    const tags = req.params.tags.split(',');
    const {skip, limit} = req.query;

    try {
      const response = await this.ArticleApp.getByTags({tags, options: {skip, limit}});
      res.json(response);
    } catch(err) {
      next(err);
    }
  }
};

module.exports = ArticleController;
