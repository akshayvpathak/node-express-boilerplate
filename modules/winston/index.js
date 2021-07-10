const winston = require('winston');

const { directory } = absoluteRequire('config');

const appRoot = `${directory}/private`;
// define the custom settings for each transport (file, console)

const options = {
  infofile: {
    level: 'info',
    filename: `${appRoot}/logs/info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: winston.format.combine(winston.format.errors({ stack: true })),
  },
  errorfile: {
    level: 'info',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: winston.format.combine(winston.format.errors({ stack: true })),
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.errorfile),
    new winston.transports.File(options.infofile),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = logger;
