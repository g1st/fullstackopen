import { Action } from './reducer';
import { Patient, Diagnosis, Entry } from '../types';

export const setPatientList = (patientListFromApi: Patient[]): Action => ({
  type: 'SET_PATIENT_LIST',
  payload: patientListFromApi,
});

export const updatePatient = (patientInfo: Patient): Action => ({
  type: 'UPDATE_PATIENT',
  payload: patientInfo,
});

export const addPatient = (patient: Patient): Action => ({
  type: 'ADD_PATIENT',
  payload: patient,
});

export const setDiagnosesList = (
  diagnosesListFromApi: Diagnosis[]
): Action => ({
  type: 'SET_DIAGNOSES_LIST',
  payload: diagnosesListFromApi,
});

export const addEntry = (id: string, entry: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: {
      id,
      entry,
    },
  };
};
