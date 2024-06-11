const http = require('http')
const express = require('express')
require('dotenv').config()

const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())
// var logger = morgan('tiny')
const Person = require('./models/person')
const { nextTick } = require('process')
// app.use(logger)

var combined = morgan('combined')


let person = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
    const date = new Date()
    person_length = Person.length
    response.send(`<p>Phonebook has info for ${person_length} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  console.log('Received ID for retrieval:', id);

  Person.findById(id)
      .then(person => {
          if (person) {
              response.json(person);
          } else {
              response.status(404).send({ error: 'Person not found' });
          }
      })
      .catch(error => {
          console.error('Error during retrieval:', error);
          next(error);
      });
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
      if (result) {
        response.status(204).end()
      }
      else {
        response.status(404).send({ error: 'malformatted id' })
      }
    }) .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate( request.params.id , person, {}).then(updatedPerson => {
        response.json(updatedPerson)
    }).then(error => next(error))
})

app.post('/api/persons',morgan('combined'), (request, response) => {
  const body = request.body

  if (!body.name && !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  } else if (person.find(persons => persons.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  // combined(`POST /api/persons HTTP/1.1 200 - 1.000 ms - ${body.name} ${body.number}`)

  const persons = new Person({
    name: body.name,
    number: body.number,
  })

  persons.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}
app.use(errorHandler)

// app.use(new_morgan)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})