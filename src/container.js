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
  ArticleRoute
} = require('./api/routes/routes');

// controllers
const {
  UserController,
  ArticleController
} = require('./api/controllers/controllers');
/* *************************************************************************/

// app layer
const application = require('./app/application');
const UserApp = require('./app/user/user.application');
const ArticleApp = require('./app/article/article.application');
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
  MongoArticleRepository
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
    ArticleApp: asClass(ArticleApp).singleton(),
  })
  // api
  .register({
    server: asClass(Server).singleton(),
    router: asFunction(router).singleton(),
    UserRoute: asClass(UserRoute).singleton(),
    UserController: asClass(UserController).singleton(),
    ArticleRoute: asClass(ArticleRoute).singleton(),
    ArticleController: asClass(ArticleController).singleton(),
  })
  // infra
  .register({
    database: asFunction(mongoose).singleton(),
    UserDbModel: asValue(UserDbModel),
    ArticleDbModel: asValue(ArticleDbModel),
    UserRepository: asClass(MongoUserRepository).singleton(),
    ArticleRepository: asClass(MongoArticleRepository).singleton(),
  })
  // shared
  .register({
    logger: asFunction(logger).singleton(),
  });

module.exports = container;
