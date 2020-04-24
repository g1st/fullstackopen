/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  NewEntry,
  EntryTypes,
  HealthCheckEntryNoId,
  HospitalEntryNoId,
  OccupationalHealthcareEntryNoId,
} from '../types';
import {
  parseName,
  parseDate,
  parseGender,
  parseOccupation,
  parseSSN,
  parseDescription,
  parseSpecialist,
  parseDiagnosisCodes,
  parseHealthCheckRating,
  parseEntryType,
  parseSickLeave,
} from './parsers';

export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    ssn: parseSSN(object.ssn),
    occupation: parseOccupation(object.occupation),
    entries: object.entries,
  };

  return newPatient;
};

export const toNewEntry = (object: any): NewEntry => {
  switch (object.type) {
    case EntryTypes.HealthCheck:
      const healthCheckEntry: HealthCheckEntryNoId = {
        type: parseEntryType(object.type),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      return healthCheckEntry;
    case EntryTypes.Hospital:
      const hospitalEntry: HospitalEntryNoId = {
        type: parseEntryType(object.type),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        discharge: object.discharge,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      };
      return hospitalEntry;
    case EntryTypes.OccupationalHealthcare:
      const occupationalHealthcareEntry: OccupationalHealthcareEntryNoId = {
        type: parseEntryType(object.type),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        employerName: parseName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
      return occupationalHealthcareEntry;
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(object)}`
      );
  }
};
