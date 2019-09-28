const UserMapper = require('./mongoUserMapper');

const MongoUserRepository = function MongoUserRepository({ UserDbModel }) {
  this.UserDbModel = UserDbModel;
};

MongoUserRepository.prototype.getAll = async function getAll() {
  const users = await this.UserDbModel.list();
  return users.map(UserMapper.toEntity);
};

MongoUserRepository.prototype.create = async function create(user) {
  const _id = this.UserDbModel.generateId();
  const data = Object.assign({}, user, {_id});

  const User = new this.UserDbModel(UserMapper.toDatabase(data));
  const newUser = await User.save();

  return UserMapper.toEntity(newUser);
};

module.exports = MongoUserRepository;
