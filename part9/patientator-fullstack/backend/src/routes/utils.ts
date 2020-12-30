/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
* Parses Input
*/
import {  
  DiagnosisEntry, EntryEntry, HealthCheckInput, SickLeave,
  HealthCheckRating, HospitalInput, Discharge, OccupationalHealthcareInput, 
} from '../types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(Number(param));
};

const isSickLeave = (param?: any): param is SickLeave => {
  const { startDate, endDate } = param as SickLeave;
  if ((startDate === "" || endDate === "") || (isDate(startDate) || isDate(endDate))) {
    return true;
  }
  return false;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${String(description)}`);
  }
  return description;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date: ${String(date)}`);
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${String(specialist)}`);
  }
  return specialist;
};

const parseDiagnosisCodes = (codes?: Array<any>): Array<DiagnosisEntry['code']> | undefined => {
  if (!codes) return undefined;
  codes.forEach(e => {
    if (!isString(e)) {
      throw new Error(`Diagnosis code is not a string: ${String(e)}`);
    }
  });
  return codes as Array<DiagnosisEntry['code']> ;
};

const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error(`Criteria is missing or invalid ${String(criteria)}`);
  }
  return criteria;
};

const parseDischarge = (discharge: any): Discharge => {
  const newEntry: Discharge = {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria)
  };
  return newEntry;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!isRating(rating) || isNaN(rating)) {
    throw new Error(`Healthcheck rating is missing or invalid ${String(rating)}`);
  }

  return rating;
};

const parseEmployeName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Employer name is missing or invalid ${String(name)}`);
  }
  return name;
};

const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
  
  if (!isSickLeave(sickLeave)) {
    throw new Error(
      `Invalid sick leave date(s): start date: ${String(sickLeave.startDate)}, end date: ${String(sickLeave.endDate)}`
    );
  }
  return sickLeave;
};

const parseHealthCheck = (object: any): HealthCheckInput => {
  const newEntry: HealthCheckInput = {
    type: "HealthCheck",
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
  };

  return newEntry;
};

const parseHospital = (object: any): HospitalInput => {
  const newEntry: HospitalInput = {
    type: "Hospital",
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    discharge: parseDischarge(object.discharge)
  };
  return newEntry;
};

const parseOccupationalHealthcare = (object: any): OccupationalHealthcareInput => {
  const newEntry: OccupationalHealthcareInput = {
    type: "OccupationalHealthcare",
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    employerName: parseEmployeName(object.employerName),
    sickLeave: parseSickLeave(object.sickLeave)
  };
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewDiagnosisEntry = (object: any): EntryEntry | undefined=> {
  
  switch (object.type){
    case "HealthCheck":
      return parseHealthCheck(object);
    case "Hospital":
      return parseHospital(object);
    case "OccupationalHealthcare":
      return parseOccupationalHealthcare(object);
    default: 
      return undefined;
  }
};


export default toNewDiagnosisEntry;