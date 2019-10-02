const express = require('express');

const Server = function Server({ config, router, logger }) {
  this.config = config;
  this.router = router;
  this.logger = logger;
  this.express = express();

  this.express.disable('x-powered-by');
  this.express.use(router);
};

Server.prototype.start = function start() {
  return new Promise((resolve) => {
    const http = this.express
      .listen(this.config.server.port, () => {
        const { port } = http.address();
        if (this.config.env !== 'test') {
          this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
        }
        resolve();
      });
  });
};

module.exports = Server;
