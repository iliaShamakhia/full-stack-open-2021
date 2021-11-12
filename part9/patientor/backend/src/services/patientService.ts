import patientData from '../../data/patients.json';
import { Patient, NoSsnPatientEntry } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const noSsnPatientEntries = (): NoSsnPatientEntry [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  noSsnPatientEntries
};