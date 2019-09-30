const User = require('./userDbModel');
const Article = require('./articleDbModel');

// TODO: Add a "parent" to manage some methods (avoid copy-paste)
module.exports = {
  UserDbModel: User,
  ArticleDbModel: Article,
};
