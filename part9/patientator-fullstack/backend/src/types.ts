export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
export type NewPatientEntry = Omit<Patient, 'id'>;

export type HealthCheckInput = Omit<HealthCheckEntry, "id">;
export type HospitalInput = Omit<HospitalEntry, "id">;
export type OccupationalHealthcareInput = Omit<OccupationalHealthcareEntry, "id">;
export type DiagnosisCodeInput = Pick<BaseEntry, "diagnosisCodes">;
export type EntryEntry = 
  | OccupationalHealthcareInput
  | HospitalInput
  | HealthCheckInput;

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export interface DiagnosisEntry {
  code: string,
  name: string,
  latin?: string
}

// ENTRIES
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosisEntry['code']>;
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type:'OccupationalHealthcare';
  employerName: string;
  sickLeave?:SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
