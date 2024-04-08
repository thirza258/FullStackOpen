import ReactDOM from "react-dom/client"
import React from "react"

const Notes = ({ notes, toggleImportance }) => {

  const label = notes.importance ? 'make not important' : 'make important'

  return (
      <div>
        <li>{notes.content}<button onClick={toggleImportance}>{label}</button></li>
      </div>
    )
  }

export default Notes