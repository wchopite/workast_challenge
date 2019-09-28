const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  tags: [{
    type: String,
    required: true
  }]
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
