import { Patient, PublicPatient } from "./types/Patient";
import { v1 as uuid } from 'uuid'
import { gender } from "./types/Patient";
import { Entry } from "./types/Patient";
import { Diagnosis } from "./types/Diagnosis";
import { HealthCheckRating } from "./types/Patient";

export const toNewDiagnostic = (object: any): Diagnosis => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('code' in object && 'name' in object) {
        let latins = ''
        if ('latin' in object) {
            latins= parseLatin(object.latin)
        }
        else {
            latins= '';
        }
        const newDiagnostic: Diagnosis = {
            code: parseCode(object.code),
            name: parseName(object.name),
            latin: latins   
        }

        return newDiagnostic;
    }

    throw new Error('Incorrect or missing data');
}

export const toNewEntry = (object: any): Entry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('id' in object && 'description' in object && 'date' in object && 'specialist' in object) {
        const newEntry: Entry = {
            id: parseId(object.id),
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            type: parseType(object.type),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            discharge: parseDischarge(object.discharge),
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave)
        }

        return newEntry;
    }

    throw new Error('Incorrect or missing data');
}

const parseId = (id: any): string => {
    if (!id || !isString(id)) {
        throw new Error('Incorrect or missing id: ' + id);
    }
    return id;
}

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
}

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }
    return specialist;

}

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
    if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
        throw new Error('Incorrect or missing diagnosisCodes: ' + diagnosisCodes);
    }
    return diagnosisCodes;
}

const parseType = (type: any): "Hospital" | "HealthCheck" | "OccupationalHealthcare" => {
    if (!type || !["Hospital", "OccupationalHealthCare" , "HealthCheck"].includes(type)) {
        throw new Error('Incorrect or missing type: ' + type);
    }
    return type;
}

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating) ) {
        throw new Error('Incorrect HealthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
}

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
}

const parseDischarge = (discharge: any): {date: string, criteria: string} => {
    if (!discharge || !isString(discharge.date) || !isString(discharge.criteria)) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return discharge;
}

const parseEmployerName = (employerName: any): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employerName: ' + employerName);
    }
    return employerName;
}

const parseSickLeave = (sickLeave: any): {startDate: string, endDate: string} => {
    if (!sickLeave || !isString(sickLeave.startDate) || !isString(sickLeave.endDate)) {
        throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
    }
    return sickLeave;

}

const parseCode = (code: any): string => {
    if (!code || !isString(code)) {
        throw new Error('Incorrect or missing code: ' + code);
    }
    return code;
}

const parseLatin = (latin: any): string => {
    if (!latin || !isString(latin)) {
        throw new Error('Incorrect or missing latin: ' + latin);
    }
    return latin;
}

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
            gender: parseGender(object.gender),
            entries: []
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