import React from 'react'
import { connect } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = (props) => {

  const vote = anecdote => {
    props.voteForAnecdote(anecdote.id)
    props.showNotification(`You voted: ${anecdote.content}`, 5)
  }

  const Anecdote = ({ anecdote }) => {
    return (
      <>
        <div>
          {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}{' '}
            {anecdote.votes === 1 ? 'vote' : 'votes'}{' '}
            <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </>
        )
    }

    return (
        <div>
              <Filter />
              {props.anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => {
                    return <Anecdote key={anecdote.id} anecdote={anecdote} />
                })              
              }
        </div>
    )
}

const mapStateToProps = (state) => {
  const filtered = state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  filtered.sort((a, b) => b.votes - a.votes)
  return {
    anecdotes: filtered
  }
}

const mapDispatchToProps = { voteForAnecdote, showNotification }

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList)


export default ConnectedAnecdotes