import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';

import { useStateValue } from '../state';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const { data: patientInfo } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: 'UPDATE_PATIENT', payload: patientInfo });
        setLoading(false);
      } catch (e) {
        console.error(e.message);
        setLoading(false);
      }
    };
    if (
      id &&
      patients.hasOwnProperty(id) &&
      !patients[id].hasOwnProperty('ssn')
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
        patients.hasOwnProperty(id) && (
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
          </>
        )
      )}
    </div>
  );
};

export default PatientPage;
