import { Patient, PublicPatient } from "./types/Patient";
import { v1 as uuid } from 'uuid'
import { gender } from "./types/Patient";

export const toNewPatient = (object: any): PublicPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object) {
        const newPatient: PublicPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            occupation: parseOccupation(object.occupation),
            gender: parseGender(object.gender)
        }

        return newPatient;
    }

    throw new Error('Incorrect or missing data');
}

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
}

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseDate = (date: any): string => {
    if (!date || !isString(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
}

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
}

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
}

const parseGender = (param: any): gender => {
    if (!isString(param) || !isGender(param)) {
        throw new Error('Incorrect Gender: ' + param);
    }
    return param;
}

const isGender = (param: string): param is gender => {
    return Object.values(gender).map(v => v.toString()).includes(param);
}