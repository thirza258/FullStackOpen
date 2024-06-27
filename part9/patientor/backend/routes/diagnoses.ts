import express from 'express';
import diagnosesService from "../services/diagnosisService";
import { toNewDiagnostic } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diagnosesService.getDiagnoses())
});

router.post('/', (_req, res) => {
  const newDiagnostic = toNewDiagnostic(_req.body);
  const newDiagnosticEntry = diagnosesService.createDiagnoses(newDiagnostic);
  res.json(newDiagnosticEntry);
});

export default router;