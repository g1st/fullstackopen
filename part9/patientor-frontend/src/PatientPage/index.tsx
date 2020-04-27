import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon, Button } from 'semantic-ui-react';

import EntryDetails from '../components/EntryDetails';
import { addEntry } from '../state';
import { useStateValue, updatePatient } from '../state';
import { Patient, Entry, EntryNoId } from '../types';
import { apiBaseUrl } from '../constants';
import AddEntryModal from '../AddEntryModal';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const submitNewEntry = async (values: EntryNoId) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
              <EntryDetails key={entry.id} entry={entry} />
            ))}
            <AddEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
          </>
        )
      )}
    </div>
  );
};

export default PatientPage;
