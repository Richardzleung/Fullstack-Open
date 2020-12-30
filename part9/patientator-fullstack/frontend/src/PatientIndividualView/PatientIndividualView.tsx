import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Grid, Icon, Button } from 'semantic-ui-react'

import { apiBaseUrl } from "../constants";
import Beth from "../images/Beth.png";
import { useStateValue, setPatient, addEntry } from "../state";
import { genderIcon, displayDiagnoses} from "./displayService";
import EntryDetails from "./EntryDetails";
import AddHealthCheckModal from "../AddHealthCheckModal";
import AddOccupationModal from "../AddOccupationalModal";
import AddHospitalModal from "../AddHospitalModal";
import { Entry, EntryFormValues } from '../types';

const PatientIndividualView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ currentPatient, diagnoses }, dispatch] = useStateValue();
  const [modalHealthOpen, setModalHealthOpen] = React.useState<boolean>(false);
  const [modalOccupationOpen, setModalOccupationOpen] = React.useState<boolean>(false);
  const [modalHospitalOpen, setModalHospitalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  
  React.useEffect(() => {
    const fetchPatientData = async () => {
      try {
        if (!Object.keys(currentPatient).includes(id)) {
          const { data: patientFromApi } = await axios.get(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(patientFromApi));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientData();
  },[id, dispatch]); // eslint-disable-line  

  const openHealthModal = (): void => setModalHealthOpen(true);
  const closeHealthModal = (): void => {
    setModalHealthOpen(false);
    setError(undefined);
  };

  const openOccupationModal = (): void => setModalOccupationOpen(true);
  const closeOccupationModal = (): void => {
    setModalOccupationOpen(false);
    setError(undefined);
  };

  const openHospitalModal = (): void => setModalHospitalOpen(true);
  const closeHospitalModal = (): void => {
    setModalHospitalOpen(false);
    setError(undefined);
  };

  const submitEntryCheck = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}`,
        values
      );
      dispatch(addEntry(newEntry, id));
      closeHospitalModal();
      closeHealthModal();
      closeOccupationModal();
      
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };
  
  // on first render returns null 
  if (Object.keys(currentPatient).length === 0 && currentPatient.constructor === Object) {
    return null;
  };

  
  const {name, gender, occupation, entries, dateOfBirth, ssn} = currentPatient[id];
  const header = (<header>{name} {"  "} {genderIcon({entry: gender})}</header>);
  const extra = (<footer><Icon name='user' />{occupation}</footer>);  

  // *9.21 Deprecated
  // eslint-disable-next-line
  const displayDiagnosesCodes = () => (
    <div>
    {entries.length !== 0 &&
      <div>
          {entries[0].date}{": "}{entries[0].description}
        <ul>
          {displayDiagnoses({ 
              patientCodes: entries[0].diagnosisCodes, 
              allDiagnoses:diagnoses 
            })?.map(e => e)
          }
        </ul>
      </div>
    }
    </div>
  )

  return (
    <div>
        <Card
          image={Beth}
          header={header}
          meta={`DoB: ${dateOfBirth}`}
          description={`SSN: ${ssn}`}
          extra={extra}
        />

        <h3>Entries:</h3>     
        <Grid columns="equal">
          <Grid.Column>
          {entries.map(e => (
              <EntryDetails key={e.id} entry={e} />
          ))}
          </Grid.Column>
        </ Grid>
        
        <AddHealthCheckModal 
          modalOpen={modalHealthOpen}
          onSubmit={submitEntryCheck}
          error={error}
          onClose={closeHealthModal}
        />
        <AddOccupationModal 
          modalOpen={modalOccupationOpen}
          onSubmit={submitEntryCheck}
          error={error}
          onClose={closeOccupationModal}
        />
        <AddHospitalModal 
           modalOpen={modalHospitalOpen}
           onSubmit={submitEntryCheck}
           error={error}
           onClose={closeHospitalModal}
        />
       
        <Button onClick={() => openHealthModal()}>Add Health Check</Button>
        <Button onClick={() => openOccupationModal()}>Add OccupationalHealthcare</Button>
        <Button onClick={() => openHospitalModal()}>Add Hospital</Button>
        
    </div>
  )
}

export default PatientIndividualView; 