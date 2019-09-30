const container = require('./src/container');
const app = container.resolve('app');

app.start()
  .then()
  .catch(error => {
    app.logger.error(error.stack);
    process.exit();
  });

process.on('uncaughtException', error => {
  app.logger.error(`uncaughtException - ${error}`);
  process.exit(1);
});

process.on('unhandledRejection', error => {
  app.logger.error(`unhandledRejection - ${error}`);
  process.exit(1);
});
