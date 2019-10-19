require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person.js');
const PORT = process.env.PORT;

const app = express();

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

app.get('/api/persons', (req, res) => {
  Person.find({}).then(phonebook => {
    res.json(phonebook.map(p => p.toJSON()));
  });
});

app.get('/info', (req, res) => {
  Person.countDocuments({}).then(phonebook => {
    res.send(`<p>Phonebook has info for ${phonebook} people</p>
      <p>${new Date()}</p>`);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
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

app.delete('/api/persons/:id', (req, res, next) => {
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

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;
  console.log('hi');
  Person.find({}).then(() => {
    const person = new Person({
      name,
      number
    });

    person
      .save()
      .then(data => {
        // console.log(data);
        res.json(data);
      })
      .catch(err => {
        next(err);
      });
  });
});

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, number } = req.body;

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

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const schemaValidationErrorHandler = (err, req, res, next) => {
  // console.error(err);
  const { errors } = err;
  // console.log(errors);
  const hasNameError = Object.prototype.hasOwnProperty.call(errors, 'name');
  const hasNumberError = Object.prototype.hasOwnProperty.call(errors, 'number');
  if (hasNameError) {
    return res.status(400).json({ error: errors.name });
  }
  if (hasNumberError) {
    return res.status(400).json({ error: errors.number });
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  next(err);
};

app.use(schemaValidationErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
