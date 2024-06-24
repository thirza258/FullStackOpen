import express from 'express';
const app = express();
import { bmiCalculator} from './bmiCalculator';
import { calculateExercises, ExerciseResult  } from './exerciseCalculator';
app.use(express.json());
import bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  
  const bmi = bmiCalculator(height, weight);

  res.json({
    height: height,
    weight: weight,
    bmi: bmi
  });

  return; // Add a return statement here
});

app.post('/exercise', (req, res) => {
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
      return res.status(400).json({ error: 'parameters missing' });
    }

    if (!Array.isArray(daily_exercises) || !daily_exercises.every(hours => !isNaN(Number(hours)))) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }

    const exerciseHours = daily_exercises.map(hours => Number(hours));
    const result: ExerciseResult = calculateExercises(exerciseHours, target);

    res.json(result);
    return;
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});