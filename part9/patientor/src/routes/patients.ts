import express from 'express';
import patientsService from '../services/patients';

const router = express.Router();

router.get('/patients', (_req, res) => {
  res.json(patientsService.getPublicPatients());
});

router.post('/patients', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  res.json(newPatient);
});

export default router;
