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

articleSchema.statics = {
  getById(id) {
    return this.findOne({_id: id});
  },
  getByTags(tags, { skip = 0, limit = 20 } = {}) {
    return this.find({tags: {$in: tags}})
      .sort({createdAt: -1})
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
  list({ skip = 0, limit = 20 } = {}) {
    return this.find()
      .sort({createdAt: -1})
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
  generateId() {
    return mongoose.Types.ObjectId();
  }
};

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
