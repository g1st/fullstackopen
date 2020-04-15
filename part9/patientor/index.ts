import express from 'express';
import cors from 'cors';

import diagnoses from './src/routes/diagnoses';
import patients from './src/routes/patients';

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 3002;

app.use('/api', diagnoses);
app.use('/api', patients);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
