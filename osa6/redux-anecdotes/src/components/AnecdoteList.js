import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  // haetaan kaikki anecdootit
  let anecdotes = props.anecdotes
  const filter = props.filter
  // suodatetaan
  anecdotes = props.filter === '' ? anecdotes : anecdotes.filter(a => a.content.includes(filter))

  const vote = (id) => {
    props.voteAnecdote(id)
    props.setNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`)
    setTimeout(() => {
      props.clearNotification()
      
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
  clearNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList