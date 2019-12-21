import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const vote = (id) => {
    props.voteAnecdote(id)
    props.setNotification(`you voted '${props.anecdotesToShow.find(a => a.id === id).content}'`)
    setTimeout(() => {
      props.clearNotification()

    }, 5000)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote => <div key={anecdote.id}>
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  return filter === null ? anecdotes : anecdotes.filter(a => a.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state)
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