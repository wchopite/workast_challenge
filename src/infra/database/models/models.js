const User = require('./userDbModel');
const Article = require('./articleDbModel');

/*
  TODO: Add a "parent [prototype]" to manage some commong methods
  like for example generateId method
*/
module.exports = {
  UserDbModel: User,
  ArticleDbModel: Article,
};
