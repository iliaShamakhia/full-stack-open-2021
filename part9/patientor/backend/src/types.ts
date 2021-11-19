export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Entry {
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: 'male' | 'female' | 'other';
    occupation: string;
    entries: Entry[];
}

export type NoSsnPatientEntry = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id' | 'entries'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >