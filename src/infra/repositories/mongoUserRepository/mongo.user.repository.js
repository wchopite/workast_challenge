const UserMapper = require('./mongoUserMapper');

const MongoUserRepository = function MongoUserRepository({UserDbModel}) {
  this.UserDbModel = UserDbModel;
};

MongoUserRepository.prototype = {
  async getAll(options) {
    const query = Object.assign({}, options);
    const users = await this.UserDbModel.list(query);
    return users.map(UserMapper.toEntity);
  },
  async create(user) {
    const _id = this.UserDbModel.generateId();
    const data = Object.assign({}, user, {_id});

    const User = new this.UserDbModel(UserMapper.toDatabase(data));
    const newUser = await User.save();

    return UserMapper.toEntity(newUser);
  }
};

module.exports = MongoUserRepository;
