import express from 'express';
import cors from 'cors';
import diagnoses from './src/routes/diagnoses';
import patients from './src/routes/patients';

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnoses);
app.use('/api/patients', patients);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
