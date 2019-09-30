const User = require('../../../domain/user/User');

const MongoUserMapper = {
  toEntity(values) {
    const {_id, name, avatar, updatedAt} = values;

    return new User({_id, name, avatar, updatedAt});
  },
  toDatabase(values) {
    const {_id, name, avatar} = values;
    return {_id, name, avatar};
  }
};

module.exports = MongoUserMapper;
