import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import services from '../services/phonebook';

const Persons = ({persons, setPersons}) => {
    const deletePersonById = (id) => {
        const person = persons.find(person => person.id === id)
        if(window.confirm(`Do you really want to delete ${person.name}`)) {
            services.deletePerson(id).then(response => {
                console.log(response)
                setPersons(persons.filter(person => person.id !== id))
            })
        }
    }
    
    
    return (

        <div>
            {persons.map(person => <><p key={person.id}>{person.name} {person.number}</p><button onClick={() => deletePersonById(person.id)}>delete</button></>)}
        </div>
    );
};

export default Persons;