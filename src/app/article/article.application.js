const ArticleApp = function ArticleApp({ArticleRepository}) {
  this.ArticleRepository = ArticleRepository;
};

ArticleApp.prototype = {
  async getAll() {
    const users = this.ArticleRepository.getAll();
    return users;
  },
  async create({article}) {
    return this.ArticleRepository.create(article);
  },
  async update({id, article}) {
    return this.ArticleRepository.update(id, article);
  },
  async remove({id}) {
    return this.ArticleRepository.remove(id);
  },
  async getByTags({tags}) {
    return this.ArticleRepository.getByTags(tags);
  }
};

module.exports = ArticleApp;
