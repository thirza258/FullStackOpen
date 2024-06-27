import { Entry } from '../types';

interface EntriesProps {
    entries: Entry;
}

const Entries = (props: EntriesProps) => {
    switch (props.entries.type) {
        case "Hospital":
        return (
            <div>
                <div>
                    <p>
                    {props.entries.date} {props.entries.description}
                    {props.entries.diagnosisCodes?.map((code) => (
                        <p key={code}>
                        {code}
                        </p>
                    ))}
                    </p>
                </div>
                <div>
                <ul>
                    <li>{props.entries.discharge.date}</li>
                    <li>{props.entries.discharge.criteria}</li>
                </ul>
                </div>
            </div>
        );
        case "OccupationalHealthcare":
        return (
            
            <div>
                <div>
                    <p>
                    {props.entries.date} {props.entries.description}
                    </p>
                </div>
                <div>
                <ul>
                    <li>{props.entries.sickLeave?.startDate}</li>
                    <li>{props.entries.sickLeave?.endDate}</li>
                </ul>
                </div>
            </div>
        );
        case "HealthCheck":
        return (
            <div>
                <div>
                    <p>
                    {props.entries.date} {props.entries.description}
                    </p>
                </div>
                <div>
                <ul>
                    <li>{props.entries.healthCheckRating}</li>
                </ul>
                </div>
            </div>
        );
        default:
        return assertNever(props.entries);
    }
}

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  export default Entries;