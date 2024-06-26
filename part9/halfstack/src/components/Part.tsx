import { CoursePart } from '../models/interfaces';

interface PartProps {
    part: CoursePart;
}

const Part = (props: PartProps) => {
    switch (props.part.kind) {
        case "basic":
        return (
            <p>
            {props.part.name} {props.part.exerciseCount} {props.part.description}
            </p>
        );
        case "group":
        return (
            <p>
            {props.part.name} {props.part.exerciseCount} {props.part.groupProjectCount}
            </p>
        );
        case "background":
        return (
            <p>
            {props.part.name} {props.part.exerciseCount} {props.part.description} {props.part.backgroundMaterial}
            </p>
        );
        case "special":
        return (
            <p>
            {props.part.name} {props.part.exerciseCount} {props.part.description} {props.part.requirements.join(", ")}
            </p>
        );
        default:
        return assertNever(props.part);
    }
}

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

export default Part;