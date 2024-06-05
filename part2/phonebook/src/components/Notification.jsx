import ReactDOM from "react-dom/client"
import React from "react"

const ErrorMessage = ({ message }) => {
    if (message === null) {
      return null
    }
    if(message.includes('Berhasil')) {
        return (
            <div className='success'>
            {message}
            </div>
        )
    } else {
        return (
            <div className='error'>
            {message}
            </div>
        )
    }
    
  }

export default ErrorMessage