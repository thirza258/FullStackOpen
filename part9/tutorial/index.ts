import express from 'express';
const app = express();

import { calculator, Operation } from './calculator';

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
    const { value1, value2, op } = req.body;   

    if ( !value1 || isNaN(Number(value1)) ) {
        return res.status(400).send({ error: '...'});
      }
  
      const operation = op as Operation;

      const result = calculator(Number(value1), Number(value2), operation);
    res.send({ result });

    return;
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});