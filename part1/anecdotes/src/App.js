import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])
  const [startVote, setStartVote] = useState(false)


  function getAnecdote() {
    return setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  function handleVote() {
    setStartVote(true)
    const copy = [...points]
    setPoints(copy, copy[selected] += 1) 
  }

  function getHighestVoteNumber() {
    const highestVotes = Math.max(...points)
    return highestVotes
  }

  function getHighestVotedQuote() {
    const highestVotes = Math.max(...points)
    const index = points.indexOf(highestVotes)
    return anecdotes[index]
  }


  return (
    <div>
      <div>
        <h1>Anecdote of the Day</h1>
      </div>
      {anecdotes[selected]}
      <div>This has {points[selected]} votes</div>
      <div>
        <button onClick={handleVote}>Vote</button>
        <button onClick={getAnecdote}>Next Anecdote</button>
      </div>
      <h2>Anecdote with the Most Votes</h2>
      { startVote ? 
        <div>
          <p>{getHighestVotedQuote()}</p>
          <p>This has {getHighestVoteNumber()} votes!</p>
        </div>
        :
        "There are no votes yet."
      }
    </div>
  )
}

export default App