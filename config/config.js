require('dotenv').config();
const path = require('path');
const fs = require('fs');

const ENV = process.env.ENV || 'development';
const envConfig = require(path.join(__dirname, 'environments', ENV));
const dbConfig = loadDbConfig();

const config = Object.assign({
  [ENV]: true,
  env: ENV,
  db: dbConfig
}, envConfig);

module.exports = config;

function loadDbConfig() {
  if(process.env.MONGODB_URL) {
    return {
      url: process.env.MONGODB_URL
    };
  }

  if(fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database')[ENV];
  }
}
