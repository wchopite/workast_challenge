const { Router, json, urlencoded } = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

module.exports = ({logger, UserRoute, ArticleRoute}) => {
  const router = Router();
  const apiRouter = Router();

  apiRouter
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(helmet())
    .use(cors())
    .use(compression());

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

  // TODO: move to a folder
  router.use( (err, req, res, next) => { // eslint-disable-line no-unused-vars
    logger.error(err);

    res.status(500).json({
      type: 'InternalServerError',
      message: err.message,
      stack: err.stack
    });
  });

  return router;
};
