const infoRouter = require('express').Router();
const Person = require('../models/person');

infoRouter.get('/', (req, res) => {
  Person.countDocuments({}).then(phonebook => {
    res.send(`<p>Phonebook has info for ${phonebook} people</p>
      <p>${new Date()}</p>`);
  });
});

module.exports = infoRouter;
