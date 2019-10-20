const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./utils/config');
const personController = require('./controllers/persons');
const infoController = require('./controllers/info');
const middleware = require('./utils/middleware');

const app = express();
const url = config.MONGODB_URI;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message);
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

app.use('/api/persons', personController);
app.use('/info', infoController);

app.use(middleware.unknownEndpoint);
app.use(middleware.schemaValidationErrorHandler);
app.use(middleware.errorHandler);

module.exports = app;
