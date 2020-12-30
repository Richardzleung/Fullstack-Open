import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_CURRENT_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_DATA";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
      id: string;
  };

export const reducer = (state: State, action: Action): State => {
  //console.log('state', state, 'action', action);
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_CURRENT_PATIENT":
      return {
        ...state,
        currentPatient: {
          [action.payload.id]: action.payload
        }
      }
    case "SET_DIAGNOSES_DATA":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagonsis) => ({ ...memo, [diagonsis.code]: diagonsis }),
            {}
          ),
          ...state.diagnoses
        }
      }
    case "ADD_ENTRY": 
      const foundPerson = Object.keys(state.patients).includes(action.id)
      if (foundPerson) {
        const personToUpdate = state.patients[action.id];
        let newEntry = null;
  
        if (!personToUpdate.entries || personToUpdate.entries.length === 0) {
          newEntry = action.payload;
        }
        newEntry = personToUpdate.entries.concat(action.payload);
        console.log({personToUpdate, newEntry});
        
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.id]: {
              ...state.patients[action.id],
              entries: newEntry
            }
          },
          currentPatient: {
            [action.id]: {
              ...state.currentPatient[action.id],
              entries: newEntry
            }
          }
        }
      }
      throw new Error('Patient not found') ;
    default:
      return state;
  }
};

export const setPatientList = (payload:Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: payload
  }
}

export const addPatient = (payload: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: payload
  }
}

export const setPatient = (payload: Patient): Action => {
  return {
    type: 'SET_CURRENT_PATIENT',
    payload: payload
  }
}

export const setDiagnosesData = (payload:Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES_DATA',
    payload: payload
  }
}

export const addEntry = (payload: Entry, id: string): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: payload,
    id: id
  }
}