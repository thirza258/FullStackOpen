import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useMatch } from 'react-router-dom'
import { useField } from './hooks/index'

const Menu = ({ anecdotes, addNew }) => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <div>
        <Link to='/' style={padding}>anecdotes</Link>
        <Link to='/create' style={padding}>create new</Link>
        <Link to='/about' style={padding}>about</Link>
      </div>
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<AnecdoteWrapper anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
      </Routes>
    </div>
  )
}

const AnecdoteWrapper = ({ anecdotes }) => {
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(a => a.id === Number(match.params.id)) : null
  return <Anecdote anecdote={anecdote} />
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  if (!anecdote) return <div>Anecdote not found</div>
  
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
    Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself.</em>
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content 
          <input 
            type={content.type} 
            value={content.value} 
            onChange={content.onChange} 
          />
        </div>
        <div>
          author 
          <input 
            type={author.type} 
            value={author.value} 
            onChange={author.onChange} 
          />
        </div>
        <div>
          url for more info 
          <input 
            type={info.type} 
            value={info.value} 
            onChange={info.onChange} 
          />
        </div>
        <button>create</button><button onClick={
          (e) => {
            e.preventDefault()
            content.reset()
            author.reset()
            info.reset()
          }
        
        }>reset</button>
      </form>
    </div>
  )
}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
  </div>
)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote "${anecdote.content}" created!`)
    setTimeout(() => setNotification(''), 10000)
  }

  return (
    
      <div>
        <h1>Software anecdotes</h1>
        {notification && <div>{notification}</div>}
        <Menu anecdotes={anecdotes} addNew={addNew} />
        <Footer />
      </div>
    
  )
}

export default App
