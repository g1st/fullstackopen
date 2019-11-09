const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const routes = require('./routes');
const logger = require('./utils/logger');

const app = express();
const url = config.MONGODB_URI;

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch(error => {
    logger.error('error connection to MongoDB:', error.message);
  });

morgan.token('body', req => {
  return JSON.stringify(req.body);
});

app.use(
  morgan((tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.body(req, res)
    ].join(' ')
  )
);
app.use(express.static('build'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', middleware.requestLogger, routes);

app.use(middleware.unknownEndpoint);
app.use(middleware.schemaValidationErrorHandler);
app.use(middleware.errorHandler);

module.exports = app;
