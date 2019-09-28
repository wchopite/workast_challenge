const UserController = function UserController({UserApp}) {
  this.UserApp = UserApp;
};

UserController.prototype.getAll = async function getAll(req, res) {
  const users = await this.UserApp.getAll();
  res.status(200).json(users);
};

UserController.prototype.create = async function create(req, res) {
  const { body } = req;

  const response = await this.UserApp.create({ user: body });
  res.status(201).json({ user: response });
};

module.exports = UserController;
