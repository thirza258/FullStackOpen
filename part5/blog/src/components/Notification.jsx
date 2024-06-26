const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    if (message.includes('Error:')) {

        return (
        <div className="error">
            {message}
        </div>
        )
    } else {
        return (
        <div className="done">
            {message}
        </div>
        )
    }

}
  
export default Notification