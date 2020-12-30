import React from 'react';
import { Icon, Divider, Header, Segment } from 'semantic-ui-react';

import { 
  assertNever, HospitalEntry, HealthCheckEntry, 
  OccupationalHealthcareEntry, Entry 
} from '../types';

const HospitalEntryDisplay: React.FC<{ entry: HospitalEntry}>=({ entry }) => {
  return (
    <Segment>
      <Header as="h4">{entry.date} <Icon name="hospital"/></Header>
        <i>{entry.description}</i>
      <Divider horizontal/>
    </Segment>
  )
}

const HealthCheckEntryDisplay: React.FC<{ entry: HealthCheckEntry}>=({ entry }) => {
  return (
    <Segment>
      <Header as="h4">{entry.date}<Icon name="heartbeat"/></Header>
      <i>{entry.description}</i>
    </Segment>
  )
}

const OccupationalHealthcareDisplay: React.FC<{ entry: OccupationalHealthcareEntry}>=({ entry }) => {
  return (
    <Segment>
      <Header as="h4">{entry.date}<Icon name="user md"/></Header>
      <i>{entry.description}</i>
    </Segment>
  )
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDisplay entry={entry} />
    case "HealthCheck":
      return <HealthCheckEntryDisplay entry={entry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDisplay entry={entry} />
    default:
      return assertNever(entry);
  }
}

export default EntryDetails;