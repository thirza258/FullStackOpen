import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <button onClick={() => setToValue(1000)}>
        thousand
      </button>
      <button onClick={() => setToValue(0)}>
        reset
      </button>
      <button onClick={() => setToValue(value + 1)}>
        increment
      </button>
    </div>
  )

  // const [left, setLeft] = useState(0)
  // const [right, setRight] = useState(0)
  // const [allClicks, setAll] = useState([])
  // const [total, setTotal] = useState(0)

  // const handleLeftClick = () => {
  //   setAll(allClicks.concat('L'))
  //   const updatedLeft = left + 1
  //   console.log('left before', left)
  //   setLeft(updatedLeft)
  //   console.log('left after', left)
  //   setTotal(updatedLeft + right) 
  // }

  // const handleRightClick = () => {
  //   setAll(allClicks.concat('R'))
  //   setRight(right + 1)
  //   setTotal(left + right)
  // }

  // return (
  //   <div>
  //     {left}
  //     <Button handleClick={handleLeftClick} text='left' />
  //     <Button handleClick={handleRightClick} text='right' />
  //     {right}
  //     <br/>
  //     <p>{allClicks.join(' ')}</p>
  //     <br/>
  //     <p>total {total}</p>
  //     <History allClicks={allClicks} />
  //   </div>
  // )
  // const [ counter, setCounter ] = useState(0)
 

  // console.log('rendering with counter value', counter)
  // const increaseByOne = () => {
  //   console.log('increasing, value before', counter)
  //   setCounter(counter + 1)
  // }
  // const decreaseByOne = () => {
  //   console.log('decreasing, value before', counter)
  //   setCounter(counter - 1)
    
  // }
  // const setToZero = () => {
  //   console.log('resetting to zero, value before', counter)
  //   setCounter(0)
  // }

  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000
  // )

  // return (
  //   <div>
  //   <Display counter={counter}/>
  //   <Button
  //       onClick={increaseByOne}
  //       text='plus'
  //     />
  //     <Button
  //       onClick={setToZero}
  //       text='zero'
  //     />     
  //     <Button
  //       onClick={decreaseByOne}
  //       text='minus'
  //     />
  //   </div>
  // )
}

const Display = ({ counter })  => <div>{counter}</div>

const Button = ({handleClick, text}) =>  <button onClick={handleClick}>{text} </button>

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

export default App