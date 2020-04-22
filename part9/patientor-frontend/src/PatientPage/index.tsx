import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';

import { useStateValue, updatePatient } from '../state';
import { Patient, Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';

const getDiagnosisName = (
  diagnoses: Diagnosis[],
  code: Diagnosis['code']
): Diagnosis['name'] => {
  const [diagnosis] = diagnoses.filter((obj) => obj.code === code);
  return diagnosis.name;
};

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const { data: patientInfo } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientInfo));
        setLoading(false);
      } catch (e) {
        console.error(e.message);
        setLoading(false);
      }
    };
    if (
      id &&
      Object.prototype.hasOwnProperty.call(patients, id) &&
      !Object.prototype.hasOwnProperty.call(patients[id], 'ssn')
    ) {
      fetchPatient();
    }
  }, [dispatch, id, patients]);

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        id &&
        Object.prototype.hasOwnProperty.call(patients, id) &&
        Object.prototype.hasOwnProperty.call(patients[id], 'entries') && (
          <>
            <h2>
              {patients[id].name}{' '}
              <Icon
                name={
                  patients[id].gender === 'male'
                    ? 'mars'
                    : patients[id].gender === 'female'
                    ? 'venus'
                    : undefined
                }
              />
            </h2>
            <p>ssn: {patients[id].ssn}</p>
            <p>occupation: {patients[id].occupation}</p>
            <h3>entries</h3>
            {patients[id].entries.map((entry) => (
              <div key={entry.id}>
                <p>
                  {entry.date} {entry.description}
                </p>
                <ul>
                  {entry.diagnosisCodes?.map((code) => (
                    <li key={code}>
                      {code} {getDiagnosisName(diagnoses, code)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )
      )}
    </div>
  );
};

export default PatientPage;
