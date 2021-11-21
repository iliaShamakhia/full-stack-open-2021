import patientData from '../../data/patients';
import { Patient, /*NoSsnPatientEntry,*/ NewPatientEntry, PublicPatient, Entry } from '../types';
import { v4 as uuidv4 } from "uuid";

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNoSsnPatients = (): /*NoSsnPatientEntry*/PublicPatient [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries:[]
    }));
};

const addPatient = (patient: NewPatientEntry): Patient => {

    const newPatient = {
      id: uuidv4(),
      ...patient
    };
    
    patients.push(newPatient);
    return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
}

const addEntry = (patientId: string, entry: Entry): Entry => {

  const patient: Patient | undefined = getPatient(patientId);
  if (!patient) {
    throw new Error(`Incorrect patient id`);
  }

  patient.entries.push(entry);

  return entry;
};

export default {
  getPatients,
  addPatient,
  getNoSsnPatients,
  getPatient,
  addEntry
};