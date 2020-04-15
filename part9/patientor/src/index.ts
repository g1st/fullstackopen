import express from 'express';
import cors from 'cors';

import diagnoses from './routes/diagnoses';

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 3002;

app.use('/api', diagnoses);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
