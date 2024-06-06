const http = require('http')
const express = require('express')

const morgan = require('morgan')
const app = express()
app.use(express.json())
// var logger = morgan('tiny')

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
    response.json(person)
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<p>Phonebook has info for ${person.length} people</p><br><p>${date}</p>`)
})

app.get('/api/person/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const persons = person.find(persons => {
        console.log(persons.id, typeof persons.id, id, typeof id, persons.id === id)
        return persons.id === id
    })
    if (persons) {
        response.json(persons)
      } else {
        response.status(404).end()
    }
  })

  app.delete('/api/person/:id', (request, response) => {
    const id = Number(request.params.id)
    person = person.filter(persons => persons.id !== id)

    response.status(204).end()
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

  const persons = {
    name: body.name,
    number: body.number,
    id: Math.random(),
  }

  person = person.concat(persons)

  response.json(person)
})


// app.use(new_morgan)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})