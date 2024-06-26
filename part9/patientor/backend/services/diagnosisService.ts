import { Diagnosis } from "../types/Diagnosis";

const diagnoses: Diagnosis[] = [
    { id: 1, name: 'Common Cold', latin: 'Rhinovirus' },
    { id: 2, name: 'Influenza', latin: 'Influenza virus' },
]

const getDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};


export default {
    getDiagnoses
}
