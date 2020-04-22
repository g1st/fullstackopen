/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, Entry } from '../types';
import { isString, isDate, isGender, typeIsCorrect } from './typeGuards';

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

export const parseDateOfBirth = (date: any): string => {
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

export const parseEntries = (entries: any): Entry[] => {
  entries.forEach((entry: Entry) => {
    if (!typeIsCorrect(entry.type)) {
      throw new Error(`Incorrect entry type: ${entry.type}`);
    }
  });
  return entries;
};
