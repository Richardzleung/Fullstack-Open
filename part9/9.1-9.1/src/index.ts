import express from 'express';
import bmiCalculator from '../exercises/bmiCalculator';
import calculateExercises from '../exercises/exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height }  = req.query;
  if (weight && height && !isNaN(Number(weight)) && !isNaN(Number(height))) {
    const result = { 
      weight: Number(weight),
      height: Number(height),
      bmi: bmiCalculator(Number(height), Number(weight))
    };
    res.send(result);
  } 
  else {
    res.send({ error: "malformatted parameters" });
  }
});

interface args {
  target: number,
  daily_exercises: Array<number>
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isNumArray(value: any): boolean {
  return Array.isArray(value) && value.length !== 0 && value.every(item => typeof item === 'number');
}

app.post('/exercises', (req, res) => {
  const body = req.body as args;
  if (!body.target || !body.daily_exercises) {
    return res.status(400).send({
      error: "parameters missing"
    });
  }
  else if (typeof body.target !== 'number' || !isNumArray(body.daily_exercises)) {
    return res.status(400).send({
      error: "malformatted parameters"
    });
  }
  else {
    return res.json(calculateExercises(body.target, body.daily_exercises));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});