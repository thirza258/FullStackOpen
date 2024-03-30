import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0);

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteAnecdote = () => {
    const updatedPoints = { ...points };

    updatedPoints[selected] = (updatedPoints[selected] || 0) + 1;

    const mostVotedAnecdoteIndex = Object.keys(updatedPoints).reduce((maxIndex, anecdoteIndex) => {
      return updatedPoints[anecdoteIndex] > updatedPoints[maxIndex] ? anecdoteIndex : maxIndex;
    }, 0);
  
    setMostVoted(mostVotedAnecdoteIndex);

    setPoints(updatedPoints);
  }

  return (
    <div>
    <div>
      {anecdotes[selected]}
      <br/>
      <Button onClick={voteAnecdote} text='vote' />
      <Button onClick={nextAnecdote} text='next anecdote' />
      <br />
      {points[selected] + ' points'}
    </div>
    <div>
      <p>Anecdote with most votes</p>
      <br/>
      {anecdotes[mostVoted]}
    </div>
    </div>
  )
}

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
      {text}
    </button>
    
  )


export default App