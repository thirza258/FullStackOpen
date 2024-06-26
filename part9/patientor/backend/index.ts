import express from 'express';
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
// import diaryRouter from './routes/diaries';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientRouter);
// app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});