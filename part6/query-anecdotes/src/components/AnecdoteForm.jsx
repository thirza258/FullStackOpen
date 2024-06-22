import { createAnecdote } from "../requests"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from "../CreateContext"
import { useRef } from "react"

const AnecdoteForm = () => {
  const dispatch  = useNotificationDispatch()
  const queryClient = useQueryClient()
  const notificationTimeout = useRef(null)
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))

      
    }
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    if (content.length < 5) {
      if (notificationTimeout.current) {
        clearTimeout(notificationTimeout.current)
      }

      // Dispatch notification for the new anecdote
      dispatch({ type: 'SET_NOTIFICATION', payload: `Anecdote "${content}" created!` })

      // Clear the notification after 10 seconds
      notificationTimeout.current = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 10000)
      return
    }
    newAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
