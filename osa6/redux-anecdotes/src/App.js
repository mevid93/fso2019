import React from 'react'
//import Notification from './components/Notification'
//import Filter from './components/Filter'
//import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      {
        //<Notification store={props.store} />
        //<Filter store={props.store} />
      }
      <AnecdoteList />
      {
        //<AnecdoteForm store={props.store} />
      }
    </div>
  )
}

export default App