import patientData from '../../data/patients';
import { Patient, /*NoSsnPatientEntry,*/ NewPatientEntry, PublicPatient } from '../types';
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

const getPatient = (id: string): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries
  })).filter(p => p.id === id);
}

export default {
  getPatients,
  addPatient,
  getNoSsnPatients,
  getPatient
};