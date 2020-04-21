/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient } from '../types';
import {
  parseName,
  parseDateOfBirth,
  parseGender,
  parseOccupation,
  parseSSN,
} from './parsers';

const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    ssn: parseSSN(object.ssn),
    occupation: parseOccupation(object.occupation),
    entries: [], // todo parse entries?
  };

  return newPatient;
};

export default toNewPatient;
