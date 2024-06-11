// const http = require('http')



// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

const express = require('express')
require('dotenv').config()
const app = express()

app.use(express.json())
const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
const mongoose = require('mongoose')

app.use(morgan('tiny'))

const Note = require('./models/note')

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only JavaScript",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       important: true
//     }
//   ]



app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

app.get('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
    if(note) {
      response.json(note)
    }
    else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const {content, important} = request.body

  Note.findByIdAndUpdate(request.params.id, {content, important}, { new: true, runValidators: true, context: 'query'})
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
  const body = request.body

const note = new Note({
  content: body.content,
  important: Boolean(body.important) || false,
})
  note.save().then(savedNote => {
    response.json(savedNote)
  }).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}



// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)
// app.get('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     console.log(id)
//     const note = notes.find(note => {
//         console.log(note.id, typeof note.id, id, typeof id, note.id === id)
//         return note.id === id
//     })
//     if (note) {
//         response.json(note)
//       } else {
//         response.status(404).end()
//     }
//   })

// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)

//     response.status(204).end()
// })



// const generateId = () => {
//     const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
//     return maxId + 1
// }

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})