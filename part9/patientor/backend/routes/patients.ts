import express from 'express';
// import diaryService from '../services/diaryService';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients())
});

router.post('/', (_req, res) => {
    const patient = toNewPatient(_req.body);
    const newPatientEntry = patientService.addPatient(patient);
    res.json(newPatientEntry);
});

router.get('/:id', (req, res) => {
    const patient = patientService.getPatientsbyId(req.params.id);
    
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

export default router;