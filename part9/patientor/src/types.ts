export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export enum EntryTypes {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryTypes;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryTypes;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryTypes;
  discharge: Discharge;
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export type HealthCheckEntryNoId = Omit<HealthCheckEntry, 'id'>;

export type OccupationalHealthcareEntryNoId = Omit<
  OccupationalHealthcareEntry,
  'id'
>;

export type HospitalEntryNoId = Omit<HospitalEntry, 'id'>;

export type NewEntry =
  | HealthCheckEntryNoId
  | OccupationalHealthcareEntryNoId
  | HospitalEntryNoId;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
