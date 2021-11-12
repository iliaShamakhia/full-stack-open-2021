import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if(!height || !weight || isNaN(height) || isNaN(weight)){
    res.send(
      {
        error: "malformatted parameters"
      }
    );
    return;
  }
  const bmi: string = calculateBmi(height, weight);
  res.send({
    weight,
    height,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  const body = req.body;
  console.log(body);
  if(!body["daily_exercises"] || !body.target){
    res.json({
      error: "parameters missing"
    });
    return;
  }
  if(isNaN(body.target) || !Array.isArray(body["daily_exercises"])){
    res.json(
      {
        error: "malformatted parameters"
      }
    );
    return;
  }
  const result = calculateExercises(body["daily_exercises"], body.target);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});