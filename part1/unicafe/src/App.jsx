import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = () => setGood(good + 1)
  const setNeutralValue = () => setNeutral(neutral + 1)
  const setBadValue = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
        <Button onClick={setGoodValue} text='good' />
        <Button onClick={setNeutralValue} text='neutral' />
        <Button onClick={setBadValue} text='bad' />
      <h1>statistics</h1>
        
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const positive = good / total * 100
  return (
    <div>
    <p>Good : {good}</p>
    <p>Neutral : {neutral}</p>
    <p>Bad : {bad}</p>
    <p>Average : {total/3}</p>
    <p>positive : {}</p>
  </div>
  )
}

export default App