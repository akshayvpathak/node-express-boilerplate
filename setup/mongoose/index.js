const mongoose = require('mongoose');
const bluebird = require('bluebird');

const { mongodbURL } = absoluteRequire('config');
const winston = absoluteRequire('modules/winston');

mongoose.Promise = bluebird;
module.exports = () => {
  mongoose.connect(mongodbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  mongoose.connection.on('connected', () => {
    winston.info('Mongoose: Started');
  });

  mongoose.connection.on('reconnecting', () => {
    winston.info('Mongoose: Reconnecting');
  });

  mongoose.connection.on('open', () => {
    winston.info('Mongoose: Connection is open');
  });

  mongoose.connection.on('disconnected', () => {
    winston.warn('Mongoose: Disconnected');
  });

  mongoose.connection.on('error', (error) => {
    winston.error(`Mongoose: Erro. ${error}`);
  });
};
