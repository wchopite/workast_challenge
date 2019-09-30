const ArticleMapper = require('./mongoArticleMapper');

const MongoArticleRepository = function MongoArticleRepository({ArticleDbModel}) {
  this.ArticleDbModel = ArticleDbModel;
};

MongoArticleRepository.prototype = {
  async getAll() {
    const articles = await this.ArticleDbModel.list();
    return articles.map(ArticleMapper.toEntity);
  },
  async create(article) {
    const _id = this.ArticleDbModel.generateId();
    const data = Object.assign({}, article, {_id});

    const Article = new this.ArticleDbModel(ArticleMapper.toDatabase(data));
    const newArticle = await Article.save();

    return ArticleMapper.toEntity(newArticle);
  },
  async update(id, article) {
    const data = ArticleMapper.toDatabase(Object.assign({}, article, {_id: id}));

    const updatedArticle = await this.ArticleDbModel.findOneAndUpdate({ _id: id }, data, {new:true});
    return ArticleMapper.toEntity(updatedArticle);
  },
  async remove(id) {
    const articleToDelete = await this.ArticleDbModel.getById(id);
    if (!articleToDelete){
      const error = new Error('ValidationError');
      error.details = { message: 'Article not exist'};
      throw error;
    }
    const deletedArticle = await articleToDelete.remove();
    return ArticleMapper.toEntity(deletedArticle);
  },
  async getByTags(tags) {
    const articles = await this.ArticleDbModel.getByTags(tags);
    return articles.map(ArticleMapper.toEntity);
  }
};

module.exports = MongoArticleRepository;
