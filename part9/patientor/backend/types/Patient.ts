export enum gender {
    male = 'male',
    female = 'female',
    other = 'other'
}
// src/models/patient.ts

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: gender;
    occupation: string;
  }
  

export type PublicPatient = Omit<Patient, 'id'>;
