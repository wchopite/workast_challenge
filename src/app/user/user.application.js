const UserApp = function UserApp({UserRepository}) {
  this.UserRepository = UserRepository;
};

UserApp.prototype = {
  async getAll() {
    const users = this.UserRepository.getAll();
    return users;
  },
  async create({user}) {
    return this.UserRepository.create(user);
  }
};

module.exports = UserApp;
