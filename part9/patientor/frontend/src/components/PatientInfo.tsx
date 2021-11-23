import React from "react";
import axios from "axios";
import { Patient, Entry } from '../types';
import { Button, Icon } from 'semantic-ui-react';

import { useParams } from 'react-router-dom';
import { useStateValue } from '../state/state';

import Hospital from './Hospital';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { apiBaseUrl } from "../constants";
import { addEntry } from "../state";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <Hospital entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcare entry={entry} />;
      case 'HealthCheck':
        return <HealthCheck entry={entry} />;
      default:
        return assertNever(entry);
    }
};

const PatientInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const [{ diagnoses }] = useStateValue();
    const patient = Object.values(patients).find(
        (patient: Patient) => patient.id === id
    );
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const submitEntries = async (values: EntryFormValues) => {
      try {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispatch(addEntry(id, newEntry));
        closeModal();
      } catch (e) {
        console.error(e.response?.data || 'Unknown Error');
        setError(e.response?.data?.error || 'Unknown error');
      }
    };

    let iconName: 'man' | 'woman' | 'genderless';
    if (patient) {
        switch (patient.gender) {
          case 'male':
            iconName = 'man';
            break;
          case 'female':
            iconName = 'woman';
            break;
          case 'other':
            iconName = 'genderless';
            break;
          default:
            iconName = 'woman';
        }
    
        return(
            <div>
                <h2>
                    {patient.name} <Icon name={iconName} />{' '}
                </h2>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <h3>entries</h3>
                {patient.entries.map((entry, i) => (
                    <div key={i}>
                        {Object.keys(diagnoses).length === 0 ? null : (
                            <EntryDetails entry={entry} />
                        )}
                    </div>
                ))}
                <AddEntryModal
                  modalOpen={modalOpen}
                  onSubmit={submitEntries}
                  error={error}
                  onClose={closeModal}
                />
                <Button onClick={() => openModal()}>Add Entries</Button>
            </div>
        );
    }
    return (
        <div>
            :(
        </div>
    );
};

export default PatientInfo;