import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Notes from './components/Notes'
import noteService from './services/notes'
import Notification from './components/Notification'

const App = (props) => {
  // const [notes, setNotes] = useState(props.notes)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 
  const [errorMessage, setErrorMessage] = useState('some Error happened...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService.getAll().then(response => {
      setNotes(response)
    })
  }, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService.update(id, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response))
    }).catch(error => {
      setErrorMessage(`Note '${note.content}' was already removed from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
}

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService.create(noteObject).then(response => {
      setNotes(notes.concat(response))
      setNewNote('')
    })
  }


  // const hook = () => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setNotes(response.data)
  //     })
  // }
  
  // useEffect(hook, [])

  // const addNote = (event) => {
  //   event.preventDefault()
  //   const noteObject = {
  //     content: newNote,
  //     important: Math.random() < 0.5,
  //   }

  //   axios
  //   .post('http://localhost:3001/notes', noteObject)
  //   .then(response => {
  //     setNotes(notes.concat(noteObject))
  //     setNewNote('')
  //   })
  
    
  // }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  
  // const toggleImportanceOf = (id) => {
  //   console.log(`importance of ${id} needs to be toggled`)
  //   const url = `http://localhost:3001/notes/${id}`
  //   const note = notes.find(n => n.id === id)
  //   const changedNote = {...note, important: !note.important}

  //   axios
  //     .put(url, changedNote)
  //     .then(response => {
  //       setNotes(notes.map(note => note.id !== id ? note : response.data))
  //     })
  // }


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Notes key={note.id} notes={note} 
          toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} 
        onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>   
      <Footer />
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}


export default App
