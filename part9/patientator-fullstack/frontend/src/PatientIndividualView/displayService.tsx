import React from 'react';
import { Icon } from 'semantic-ui-react';

import { Gender, DiagnosisMap } from '../types';

export const genderIcon = (prop: { entry: Gender }): JSX.Element | string  => {
  switch (prop.entry) {
    case "male":
      return <Icon name="mars"/>
    case "female":
      return <Icon name="venus"/>
    case "other":
      return <Icon name="neuter"/>
    default:
      return `this should never happen ${prop.entry}`;
  }
};

export const displayDiagnoses = (
    props: { patientCodes: string[] | undefined, allDiagnoses: DiagnosisMap }
  ): Array<JSX.Element| undefined> | null => {
    const { patientCodes, allDiagnoses } = props; 
    const diagnosisCodeArray = Object.keys(allDiagnoses);
    
    const display = patientCodes?.map(code => {
      // console.log({code, patientCodes});
      const matchingCode = diagnosisCodeArray.find(e => e === code);
      if (matchingCode) {
        return (
          <li key={code}>{code}{" "} {allDiagnoses[matchingCode].name}</li>
        )
      }
    })
    return (display ? display : null)
};
