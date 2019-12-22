
const getId = () => (100000 * Math.random()).toFixed(0)

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTE',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const target = state.find(n => n.id === id)
      const votedAnecdote = {
        ...target,
        votes: target.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote).sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      const newAnecdote = action.data
      return [...state, newAnecdote].sort((a, b) => b.votes - a.votes)
    case 'INIT_ANECDOTE':
      return action.data
    default:
      return state
  }
}

export default reducer