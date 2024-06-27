import { Diagnosis } from "../types/Diagnosis";

const diagnoses: Diagnosis[] = [
    { code: "1", name: 'Common Cold', latin: 'Rhinovirus' },
    { code: "2", name: 'Influenza', latin: 'Influenza virus' },
]

const getDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

const createDiagnoses = (diagnosis: Diagnosis): Diagnosis => {
    diagnoses.push(diagnosis);
    return diagnosis;
}

export default {
    getDiagnoses, createDiagnoses
}
