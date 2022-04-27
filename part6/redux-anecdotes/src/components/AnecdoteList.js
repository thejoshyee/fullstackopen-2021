import { useDispatch, useSelector } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'

// presentational component
const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
      </div>
    </>
      )
  }

// container component
const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)

    return (
        <div>
        {sortedAnecdotes.map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() =>
                dispatch(vote(anecdote.id))
              }
            />
          )}
        </div>
    )
}

export default AnecdoteList