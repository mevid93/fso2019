import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    event.target.anecdote.value = ''
    props.setNotification(`you added anecdote '${content}'`)
    setTimeout(() => {
      props.clearNotification()
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
  clearNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
