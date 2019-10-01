const UserApp = function UserApp({UserRepository}) {
  this.UserRepository = UserRepository;
};

UserApp.prototype = {
  async getAll({options}) {
    const users = this.UserRepository.getAll(options);
    return users;
  },
  async create({user}) {
    return this.UserRepository.create(user);
  }
};

module.exports = UserApp;
