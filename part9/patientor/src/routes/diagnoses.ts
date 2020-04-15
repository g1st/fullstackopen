import express from 'express';
import diagnosesService from '../services/diagnoses';

const router = express.Router();

router.get('/diagnoses', (_req, res) => {
  res.json(diagnosesService.getAllDiagnoses());
});

export default router;
