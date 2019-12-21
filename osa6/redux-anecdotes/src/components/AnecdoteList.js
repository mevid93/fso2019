import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const anecdotes = props.store.getState().anecdotes

  const vote = (id) => {
    props.store.dispatch(
      voteAnecdote(id)
    )
    props.store.dispatch(
      setNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`)
    )
    setTimeout(() => {
      props.store.dispatch(
        clearNotification()
      )
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList