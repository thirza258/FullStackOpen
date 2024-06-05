import React, { useState, useEffect } from 'react';
import axios from 'axios'
import services from '../services/phonebook'

const PersonForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [errorMessage, setErrorMessage] = useState('some error happened...')

    const hook = () => {
      console.log('effect')
      services.getAll().then(response => {
        setPersons(response)
      })
    }

    useEffect(hook, [])

    const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
  
      services.create(personObject).then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
    }
  
    const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
    }
  
    const handleNumberChange = (event) => {
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

    const updateNumber = (event) => {
        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, number: newNumber}
        services.update(person.id, changedPerson).then(response => {
          setPersons(persons.map(person => person.id !== person.id ? person : response))
          setNewName('')
          setNewNumber('')
        })
        event.preventDefault()
    }

    const updatePersonNumber = (event) => {
      if(persons.find(person => person.name === newName)) {
        alert(`${newName} is already added to phonebook want to update the number?`)
        if(window.confirm('Do you want to update the number?')) {
          updateNumber(event)
        }
        event.preventDefault()
      } else {
        addPerson(event)
        setErrorMessage(
          `Berhasil Membuat ${event.personObject.name} dengan nomor ${event.personObject.number}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  
    return (
      <form onSubmit={updatePersonNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

export default PersonForm;