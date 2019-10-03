const { Router, json, urlencoded } = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

module.exports = ({logger, config, swaggerMiddleware, UserRoute, ArticleRoute}) => {
  const router = Router();
  const apiRouter = Router();

  apiRouter
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(helmet())
    .use(cors())
    .use(compression())
    .use('/docs', swaggerMiddleware);

  // global health check
  router.get('/', (req, res) => res.json({status: 'ok'}));

  /*
   * API routes are defined here
   */
  apiRouter
    .use('/users', UserRoute)
    .use('/articles', ArticleRoute);

  router
    .use('/api', apiRouter);

  router.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });

  router.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
    if (config.env !== 'test') {
      logger.error(error);
    }
    res.status(error.status || 500);
    res.json({error: {message: error.message}});
  });

  return router;
};
