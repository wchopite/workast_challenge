const UserApp = function UserApp({UserRepository}) {
  this.UserRepository = UserRepository;
};

UserApp.prototype.getAll = async function getAll() {
  const users = this.UserRepository.getAll();
  return users;
};

UserApp.prototype.create = async function create({ user }) {
  return this.UserRepository.create(user);
};

module.exports = UserApp;
