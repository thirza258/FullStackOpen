import { gender, Patient, PublicPatient } from "../types/Patient";

import { v1 as uuid } from 'uuid'
const ssn = uuid();

const patients: Patient[] = [
    {
        id: '1',
        name: 'John Doe',
        dateOfBirth: '1970-01-01',
        ssn: '010170-999A',
        gender: gender.male,
        occupation: 'gardener',
        entries: [
            {
                id: '1',
                description: 'Back pain',
                date: '2019-08-05',
                specialist: 'Dr. Smith',
                diagnosisCodes: ['M54.2'],
                type: 'HealthCheck',
                healthCheckRating: 0
            },
            {
                id: '4',
                description: 'Back pain',
                date: '2019-08-05',
                specialist: 'Dr. Smith',
                diagnosisCodes: ['M54.2'],
                type: 'Hospital',
                discharge: {
                    date: '2019-08-10',
                    criteria: 'Healing'
                }
            }

        ]
    }
];

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsbyId = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const addPatient = (input: PublicPatient ): Patient => {
    const newPatient = {
        id: uuid(),
        ...input
    };
    patients.push(newPatient);
    return newPatient;
  };

export default {
    getPatients,
    getPatientsbyId,
    addPatient
}
