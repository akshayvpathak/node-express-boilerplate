const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const { cors } = absoluteRequire('modules/cors');
const winston = absoluteRequire('modules/winston');
const expressRoutes = absoluteRequire('routes');
const { directory } = absoluteRequire('config');

const app = express();
app.use(cors);
app.use(morgan('combined', { stream: winston.stream }));
app.use(compression());
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(directory, 'public')));

expressRoutes(app);

app.use((err, req, res, next) => {
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method}
     - ${req.ip}`
  );
  res.statusCode = err.status || 500;
  if (!err.message) {
    // eslint-disable-next-line no-param-reassign
    err.message = 'something wrong';
  }
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: false, message: err.message });
});

module.exports = app;
