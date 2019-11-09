const app = require('express').Router();
const info = require('./info');
const persons = require('./persons');

app.use('/info', info);
app.use('/api/persons', persons);

module.exports = app;
