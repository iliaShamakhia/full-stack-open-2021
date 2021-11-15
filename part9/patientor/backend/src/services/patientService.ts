import patientData from '../../data/patientsData';
import { Patient, NoSsnPatientEntry, NewPatientEntry } from '../types';
import { v4 as uuidv4 } from "uuid";

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNoSsnPatients = (): NoSsnPatientEntry [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
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

export default {
  getPatients,
  addPatient,
  getNoSsnPatients
};