require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person.js');
const PORT = process.env.PORT || 3001;

const app = express();

morgan.token('body', (req, res) => {
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
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;

  Person.findByIdAndRemove(id)
    .then(data => {
      console.log(data);
      if (data) {
        res.status(204).json(data.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  let data;
  Person.find({}).then(phonebook => {
    data = phonebook.map(p => p.toJSON());
    // later will be validated properly
    if (!name) {
      return res.status(404).json({ error: 'name must be provided' });
    }

    if (!number) {
      return res.status(404).json({ error: 'number must be provided' });
    }

    if (data.find(p => p.name === name)) {
      return res.status(404).json({ error: 'name must be unique' });
    }

    const person = new Person({
      name,
      number
    });

    person.save().then(data => res.json(data));
  });
});

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, number } = req.body;

  Person.findByIdAndUpdate(id, { name, number })
    .then(data => {
      console.log(data);
      if (data) {
        res.status(201).json(data.toJSON());
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

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  next(err);
};

app.use(errorHandler);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
