import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Patient } from '../types';
import patientService from '../services/patients'; // Ensure you have this service
import Entries from './Entries';

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.getPatientById(id);
        setPatient(fetchedPatient);
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{patient.name}</h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
        {patient.entries.map((entry) => (
            <Entries key={entry.id} entries={entry} />
        ))}
    </div>
  );
};

export default PatientDetail;
