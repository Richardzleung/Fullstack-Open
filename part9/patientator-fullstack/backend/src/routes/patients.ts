import express from 'express';

import patientService from '../services/patientService';
import diagnosisService from '../services/diagnosisService';
import toNewDiagnosisEntry from './utils';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.post('/:id', (req, res) => {
  try {
    const newDiagnosisEntry = toNewDiagnosisEntry(req.body);
    
    console.log({newDiagnosisEntry});
    console.log( typeof newDiagnosisEntry);
    
    const addedEntry = diagnosisService.addDiagnosis(newDiagnosisEntry, req.params.id);
    console.log({addedEntry});
    res.json(addedEntry);
  } catch(e) {
    res.status(400).send((e as Error).message);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;
