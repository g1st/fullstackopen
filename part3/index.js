const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3001;

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let data = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
];

app.get('/api/persons', (req, res) => {
  res.json(data);
});

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${data.length} people</p>
    <p>${new Date()}</p>
  `);
});

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  const singlePerson = data.find(p => p.id === Number(id));

  if (singlePerson) {
    return res.json(singlePerson);
  }

  return res.status(404).end();
});

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  data = data.filter(p => p.id !== Number(id));

  return res.status(204).json(data);
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name) {
    return res.status(404).json({ error: 'name must be provided' });
  }

  if (!number) {
    return res.status(404).json({ error: 'number must be provided' });
  }

  if (data.find(p => p.name === name)) {
    return res.status(404).json({ error: 'name must be unique' });
  }

  const newPerson = { name, number, id: Math.floor(Math.random() * 1000000) };
  data = data.concat(newPerson);

  return res.json(newPerson);
});

const error = (req, res) => {
  console.log('404 erroriukas');
  return res.status(404).send('404 erroriukas');
};

app.use(error);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
