import patientData from '../../data/patients';
import crypto from 'crypto';
import { Patient, PublicPatient, NewPatientEntry } from '../types';

const getPatients = ():Patient[] | null => {
  if (patientData) {
    return patientData;
  }
  return null;
};

const addPatient = (entry: NewPatientEntry):Patient => {
  const newPatientEntry = {
    id: crypto.randomBytes(16).toString("hex"),
    ...entry
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

const getNonSensitivePatientData= (): PublicPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patientData.find(d => d.id === id);
  return entry;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatientData,
  findById
};