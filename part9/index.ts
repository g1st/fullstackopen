import express from 'express';
import bodyParser from 'body-parser';

import { calculateBmi, parseQuery } from './bmiCalculator';
import { calculator } from './calculate';
import { calculateExercises, parseArgs } from './exerciseCalculator';

const PORT = 3000;

const app = express();

// parse application/json
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

interface MyReq extends express.Request {
  query: {
    height: string;
    weight: string;
  };
}

app.get('/bmi', (req: MyReq, res) => {
  try {
    const { weight, height } = parseQuery(req.query);
    const result = calculateBmi(weight, height);
    res.json({ weight, height, bmi: result });
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.get('/calculate', (req, res) => {
  const { value1, value2, op } = req.query;

  try {
    const num1 = Number(value1);
    const num2 = Number(value2);
    const operation: string = op.toString();
    const result = calculator(num1, num2, operation);
    res.json({
      value1: num1,
      value2: num2,
      operation: op,
      result,
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.post('/exercises', (req, res) => {
  try {
    const { daily_exercises: dailyExercises, target } = req.body;
    const { hoursArray, target: trg } = parseArgs(dailyExercises, target);
    const result = calculateExercises(hoursArray, trg);

    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
