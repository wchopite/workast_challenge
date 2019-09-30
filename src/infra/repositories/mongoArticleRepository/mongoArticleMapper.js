const Article = require('../../../domain/article/Article');

const MongoArticleMapper = {
  toEntity(values) {
    const {_id, title, text, userId, tags, updatedAt} = values;

    return new Article({ _id, title, text, userId, tags, updatedAt});
  },
  toDatabase(values) {
    const {_id, title, text, userId, tags} = values;
    return {_id, title, text, userId, tags};
  }
};

module.exports = MongoArticleMapper;
