const { attributes } = require('structure');

const Article = attributes({
  _id: String,
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: false
  },
  userId: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  updatedAt: {
    type: Date,
    required: false
  }
})(class Article {});

module.exports = Article;
