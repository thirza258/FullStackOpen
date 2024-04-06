import React from 'react';

const Filter = ({persons, setPersonsToShow}) => {

    const filterPerson = (event) => {
        const inputValue = event.target.value.toLowerCase();
        if (inputValue === '') {
          setPersonsToShow(persons); // Reset the persons list when input is empty
        } else {
          const personToShow = persons.filter(person =>
            person.name.toLowerCase().includes(inputValue)
          );
          setPersonsToShow(personToShow); // Update persons list based on the input value
        }
      };
    
      
    return (
        <div>
            <div>filter shown with <input onChange={filterPerson}/></div>
        </div>
    );
};

export default Filter;