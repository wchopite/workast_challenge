const { createContainer, asClass, asFunction, asValue } = require('awilix');

// config layer
const config = require('../config/config');
/* *************************************************************************/

// api layer
const Server = require('./api/server');
const router = require('./api/router');

// routes
const {
  UserRoute,
} = require('./api/routes/routes');

// controllers
const {
  UserController,
} = require('./api/controllers/controllers');
/* *************************************************************************/

// app layer
const application = require('./app/application');
const UserApp = require('./app/user/user.application');
/* *************************************************************************/

// infra layer
const mongoose = require('./infra/mongoose/mongoose');

// DBModels
const {
  UserDbModel,
  ArticleDbModel,
} = require('./infra/database/models/models');

// Repositories
const {
  MongoUserRepository,
} = require('./infra/repositories/repositories');
/* *************************************************************************/

// shared layer
const { logger } = require('./shared/shared');
/* *************************************************************************/

const container = createContainer();

container
  // config
  .register({
    config: asValue(config),
  })
  // application
  .register({
    app: asClass(application).singleton(),
    UserApp: asClass(UserApp).singleton(),
  })
  // api
  .register({
    server: asClass(Server).singleton(),
    router: asFunction(router).singleton(),
    UserRoute: asClass(UserRoute).singleton(),
    UserController: asClass(UserController).singleton(),
  })
  // infra
  .register({
    database: asFunction(mongoose).singleton(),
    UserDbModel: asValue(UserDbModel),
    ArticleDbModel: asValue(ArticleDbModel),
    UserRepository: asClass(MongoUserRepository).singleton(),
  })
  // shared
  .register({
    logger: asFunction(logger).singleton(),
  });

module.exports = container;
