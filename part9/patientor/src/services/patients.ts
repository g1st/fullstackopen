import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewEntry, Entry } from '../types';

const getPatients = (): Array<Patient> => {
  return patientsData;
};

const getPublicPatients = (): Array<PublicPatient> => {
  const publicPatients: Array<PublicPatient> = patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );

  return publicPatients;
};

const getPatient = (id: string): Patient[] =>
  patientsData.filter((patient) => patient.id === id);

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry,
  };

  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuidv4(),
    ...entry,
  };

  patientsData.map((patient) => {
    if (patient.id === id) {
      patient.entries.push(newEntry);
    }
  });

  return newEntry;
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  getPatient,
  addEntry,
};
