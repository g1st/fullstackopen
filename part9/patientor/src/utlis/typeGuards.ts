/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender } from '../types';

export const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
