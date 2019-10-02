const mongoose = require('mongoose');
const { pagination } = require('../../../../config/config');

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
  getByTags(tags, {skip = 0, limit = pagination.limit} = {}) {
    return this.find({tags: {$in: tags}})
      .sort({createdAt: -1})
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
  list({skip = 0, limit = pagination.limit} = {}) {
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

articleSchema.index({tags: 1});
articleSchema.index({userId: 1});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
