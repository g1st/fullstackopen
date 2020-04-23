import React from 'react';
import { Card } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

import {
  Entry,
  EntryTypes,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Diagnosis,
} from '../types';
import { useStateValue } from '../state';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const getDiagnosisName = (
  diagnoses: Diagnosis[],
  code: Diagnosis['code']
): Diagnosis['name'] => {
  const [diagnosis] = diagnoses.filter((obj) => obj.code === code);
  return diagnosis.name;
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}
            <Icon name="hospital" size="large" />
          </Card.Header>
          <Card.Description>{entry.description}</Card.Description>
          <Card.Description>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {code} {getDiagnosisName(diagnoses, code)}
                </li>
              ))}
            </ul>
          </Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date} <Icon name="stethoscope" size="large" />
          </Card.Header>
          <Card.Description>{entry.description}</Card.Description>
          <Card.Description>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {code} {getDiagnosisName(diagnoses, code)}
                </li>
              ))}
            </ul>
          </Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date} <Icon name="doctor" size="large" />
          </Card.Header>
          <Card.Description>{entry.description}</Card.Description>
          <Card.Description>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {code} {getDiagnosisName(diagnoses, code)}
                </li>
              ))}
            </ul>
          </Card.Description>
          <Card.Description>
            <Icon
              name="heart"
              color={
                entry.healthCheckRating === 0
                  ? 'green'
                  : entry.healthCheckRating === 1
                  ? 'yellow'
                  : entry.healthCheckRating === 2
                  ? 'orange'
                  : 'red'
              }
            />
          </Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryTypes.Hospital:
      return <Hospital entry={entry} />;
    case EntryTypes.OccupationalHealthcare:
      return <OccupationalHealthcare entry={entry} />;
    case EntryTypes.HealthCheck:
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
