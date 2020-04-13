import express from 'express';

const PORT = 3000;

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
