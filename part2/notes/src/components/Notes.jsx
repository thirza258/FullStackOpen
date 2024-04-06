import ReactDOM from "react-dom/client"
import React from "react"

const Notes = ({ notes }) => {
    return (
      <div>
        <li>{notes.content}</li>
      </div>
    )
  }

export default Notes