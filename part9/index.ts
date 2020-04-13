import express from 'express';
import { calculateBmi, parseQuery } from './bmiCalculator';

const PORT = 3000;

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

interface myReq extends express.Request {
  query: {
    height: string;
    weight: string;
  };
}

app.get('/bmi', (req: myReq, res) => {
  try {
    const { weight, height } = parseQuery(req.query);
    const result = calculateBmi(weight, height);
    res.json({ weight, height, bmi: result });
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
