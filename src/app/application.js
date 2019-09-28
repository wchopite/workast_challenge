const Application = function Application({server, database, logger}) {
  this.server = server;
  this.database = database;
  this.logger = logger;
};

Application.prototype.start = async function start() {
  if(this.database) {
    await this.database.connect();
  }

  await this.server.start();
};

module.exports = Application;
