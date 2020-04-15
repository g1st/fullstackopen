import express from 'express';
import patientsService from '../services/patients';

const router = express.Router();

router.get('/patients', (_req, res) => {
  res.json(patientsService.getPublicPatients());
});

export default router;
