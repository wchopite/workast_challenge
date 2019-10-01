const UserController = function UserController({UserApp}) {
  this.UserApp = UserApp;
};

// TODO: add a wrap to manage errors
UserController.prototype = {
  async getAll(req, res, next) {
    const {skip, limit} = req.query;

    try {
      const users = await this.UserApp.getAll({options: {skip, limit}});
      res.status(200).json(users);
    } catch(err) {
      next(err);
    }
  },
  async create(req, res, next) {
    const {body} = req;

    try {
      const response = await this.UserApp.create({user: body});
      res.status(201).json({user: response});
    } catch(err) {
      next(err);
    }
  }
};

module.exports = UserController;
