const personRouter = require('express').Router();
const Person = require('../models/person');

personRouter.get('/', (req, res) => {
  Person.find({}).then(phonebook => {
    res.json(phonebook.map(p => p.toJSON()));
  });
});

personRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Person.findById(id)
    .then(person => person.toJSON())
    .then(formattedPerson => {
      if (formattedPerson) {
        res.json(formattedPerson);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

personRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Person.findByIdAndRemove(id)
    .then(data => data.toJSON())
    .then(formattedData => {
      if (formattedData) {
        res.status(204).json(formattedData);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

personRouter.post('/', (req, res, next) => {
  const { name, number } = req.body;

  Person.find({}).then(() => {
    const person = new Person({
      name,
      number
    });

    person
      .save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      });
  });
});

personRouter.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, number } = req.body;
  console.log(id, name, number);
  Person.findByIdAndUpdate(
    id,
    { name, number },
    { runValidators: true, context: 'query' }
  )
    .then(data => data.toJSON())
    .then(formattedData => {
      if (formattedData) {
        res.status(201).json(formattedData);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

module.exports = personRouter;
