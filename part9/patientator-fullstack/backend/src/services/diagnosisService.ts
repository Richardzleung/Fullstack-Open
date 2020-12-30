import crypto from 'crypto';

import patientData from '../../data/patients';
import diagnosesData from '../../data/diagnoses.json';
import { DiagnosisEntry, Entry, EntryEntry } from '../types';

const getDiagnosis = (): DiagnosisEntry[] => {
  return diagnosesData;
};

const addDiagnosis = (entry: EntryEntry | undefined, id: string): Entry | Error => {
  const person = patientData.find(e => e.id === id);
  if (!person || !entry) {
    return new Error('Person not found!');
  }
  const newDiagnosisEntry = {
    id: crypto.randomBytes(16).toString("hex"),
    ...entry
  };

  person?.entries.push(newDiagnosisEntry);
  return newDiagnosisEntry;
};

export default { getDiagnosis, addDiagnosis };