import { useDispatch, useSelector } from 'react-redux'
import anecdoteReducer, { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes);
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const voteAnecdote = (id) => {
        dispatch(vote(id));
    };

    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            {filteredAnecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdoteList;