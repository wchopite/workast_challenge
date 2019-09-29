const ArticleController = function ArticleController({ArticleApp}) {
  this.ArticleApp = ArticleApp;
};

ArticleController.prototype = {
  async getAll(req, res) {
    const { from, to, limit } = req.query;

    const articles = await this.ArticleApp.getAll({options: {from, to, limit}});
    res.status(200).json(articles);
  },
  async create(req, res) {
    const {body} = req;

    const response = await this.ArticleApp.create({article: body});
    res.status(201).json({article: response});
  },
  async update(req, res) {
    const {id} = req.params;
    const {body} = req;

    const response = await this.ArticleApp.update({id, article: body});
    res.json(response);
  },
  async remove(req, res) {
    const {id} = req.params;

    const response = await this.ArticleApp.remove({id});
    res.json(response);
  }
};

module.exports = ArticleController;
