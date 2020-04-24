import express from 'express';
import patientsService from '../services/patients';
import { toNewPatient, toNewEntry } from '../utlis/functions';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const [patient] = patientsService.getPatient(id);
    res.json(patient);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

router.post('/', (req, res) => {
  try {
    const parsedNewPatient = toNewPatient(req.body);
    const newPatient = patientsService.addPatient(parsedNewPatient);
    res.json(newPatient);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

router.get('/:id/entries', (req, res) => {
  try {
    const { id } = req.params;
    const parsedNewEntry = toNewEntry(req.body);
    const entry = patientsService.addEntry(id, parsedNewEntry);
    res.json(entry);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

export default router;
