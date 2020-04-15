import patientsData from '../data/patients';
import { Patient, PublicPatient } from '../types';

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

export default {
  getPatients,
  getPublicPatients,
};
