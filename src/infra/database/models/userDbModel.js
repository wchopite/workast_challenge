const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  }
}, { timestamps: true });

userSchema.statics = {
  /**
   * List users in descending order of 'createdAt' timestamp
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 20 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
  generateId() {
    return mongoose.Types.ObjectId();
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
