/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Gender,
  EntryTypes,
  HealthCheckRating,
  SickLeave,
  Discharge,
} from '../types';
import {
  isString,
  isDate,
  isGender,
  typeIsCorrect,
  isHealthCheckRatingCorrect,
} from './typeGuards';

export const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }

  return name;
};

export const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }

  return ssn;
};

export const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }

  return occupation;
};

export const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }

  return date;
};

export const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

export const parseEntryType = (type: any): EntryTypes => {
  if (!type || !typeIsCorrect(type)) {
    throw new Error(`Incorrect or missing entry's type: ${type}`);
  }

  return type;
};

export const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }

  return description;
};

export const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }

  return specialist;
};

export const parseDiagnosisCodes = (codes: any): string[] => {
  if (!Array.isArray(codes)) {
    throw new Error(`Codes aren't an array: ${codes}`);
  }
  codes.map((code) => {
    if (!code || !isString(code)) {
      throw new Error(
        `Incorrect or missing code: ${code} in the codes array: ${codes}`
      );
    }
  });

  return codes;
};

export const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (Number.isNaN(rating) || !isHealthCheckRatingCorrect(rating)) {
    throw new Error(`Incorrect or missing rating: ${rating}`);
  }

  return rating;
};

export const parseSickLeave = (dates: any): SickLeave => {
  if (typeof dates !== 'object' || dates === null) {
    throw new Error(`Dates aren't an object: ${dates}`);
  }

  parseDate(dates.startDate);
  parseDate(dates.endDate);

  return dates;
};

export const parseDischarge = (criteria: any): Discharge => {
  if (typeof criteria !== 'object' || criteria === null) {
    throw new Error(`Criteria aren't an object: ${criteria}`);
  }

  parseDate(criteria.date);
  parseName(criteria.criteria);

  return criteria;
};
