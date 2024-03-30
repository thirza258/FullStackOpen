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
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (total === 0) ? 0 : total / 3;
  const positive = (total === 0) ? 0 : (good / total) * 100;

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Good : {good} </p>
        <p>Neutral : {neutral}</p>
        <p>Bad : {bad}</p>
        <p>Average : {average.toFixed(1)}</p>
        <p>Positive : {positive.toFixed(1)}%</p>
      </div>
    );
  }
};

export default App