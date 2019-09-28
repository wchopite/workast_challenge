const mongoose = require('mongoose');

module.exports = ({ logger, config }) => {
  return {
    connect() {
      let uri = process.env.MONGODB_URL;
      if (!uri && config.env !== 'production') {
        uri = config.db.url;
      }

      mongoose.Promise = Promise;

      mongoose.connection.on('error', (err) => {
        logger.error(`MongoDB connection error: ${err}`);
        process.exit(1);
      });

      process.on('SIGINT', function(){
        mongoose.connection.close(() => {
          logger.info('Mongoose default connection is disconnected due to application termination a');
        });
        process.exit(0);
      });

      if (config.env === 'development') {
        mongoose.set('debug', true);
      }

      mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      });

      return new Promise((resolve) => {
        mongoose.connection.on('connected', () => {
          logger.info(`Mongoose default connection is open to ${uri}`);
          resolve(mongoose.connection);
        });
      });
    },
    close(message = 'DB connection closed') {
      mongoose.connection.close(() => {
        logger.info(`${message}`);
      });
    }
  };
};
