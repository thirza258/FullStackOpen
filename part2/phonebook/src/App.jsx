import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState([...persons])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number : newNumber,
      id: persons.length + 1,
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handle = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const phoneHandle = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const noNewPerson = (event) => {
    if(persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      event.preventDefault()
    } else {
      addPerson(event)
    }
  }

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
      <h2>Phonebook</h2>
      <Filter  persons={persons} setPersonsToShow={setPersonsToShow} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <Persons persons={personsToShow} />
    </div>
  )
}

// const PersonForm = ({persons, setPersons}) => {
//   const [newName, setNewName] = useState('')
//   const [newNumber, setNewNumber] = useState('')

//   const addPerson = (event) => {
//     event.preventDefault()
//     const personObject = {
//       name: newName,
//       number: newNumber,
//       id: persons.length + 1,
//     }

//     setPersons(persons.concat(personObject))
//     setNewName('')
//     setNewNumber('')
//   }

//   const handleNameChange = (event) => {
//     console.log(event.target.value)
//     setNewName(event.target.value)
//   }

//   const handleNumberChange = (event) => {
//     console.log(event.target.value)
//     setNewNumber(event.target.value)
//   }

//   return (
//     <form onSubmit={addPerson}>
//       <div>
//         name: <input value={newName} onChange={handleNameChange} />
//       </div>
//       <div>
//         number: <input value={newNumber} onChange={handleNumberChange} />
//       </div>
//       <div>
//         <button type="submit">add</button>
//       </div>
//     </form>
//   )
// }

// const Persons = ({persons}) => {
//   return (
//     <div>
//       {persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
//     </div>
//   )
// }

export default App