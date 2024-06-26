import React from 'react';
import { Entry }  from './Form';

interface EntriesProps {
  entries: Entry[];
}

const Entries = (props: EntriesProps) => {
  return (
    <div>
      <h2>Entries</h2>
      {props.entries.length === 0 ? (
        <p>No entries</p>
      ) : (
        <ul>
          {props.entries.map((entry, index) => (
            <li key={index}>
              <p>Date: {entry.date}</p>
              <p>Visibility: {entry.visibility}</p>
              <p>Weather: {entry.weather}</p>
              <p>Comment: {entry.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Entries;
