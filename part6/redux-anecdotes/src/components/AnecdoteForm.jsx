import { useDispatch } from 'react-redux'
import anecdoteReducer , { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(showNotification(`You added '${content}'`, 5))
        dispatch(createAnecdote(content))
    }
    
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button>create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm