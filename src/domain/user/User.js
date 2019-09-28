const { attributes } = require('structure');

const User = attributes({
  _id: String,
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  updatedAt: {
    type: Date,
    required: false
  }
})(class User {});

module.exports = User;
