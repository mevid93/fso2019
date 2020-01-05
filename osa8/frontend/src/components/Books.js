import React, { useState } from 'react'

const Books = ({ show, result }) => {
  const [filter, setFilter] = useState('all genres')

  if (!show) {
    return null
  }

  if (result.loading || result.data === undefined) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genrelist = ['refactoring', 'agile', 'patterns', 'desing', 'crime', 'classic', 'all genres']

  const handleClick = (event) => {
    event.persist() // hack fix https://medium.com/trabe/react-syntheticevent-reuse-889cd52981b6
    setFilter(event.target.value)
  }

  const filteredBooks = () => {
    const filteredBooks = books.filter(b => {
      for (let i = 0; i < b.genres.length; i++) {
        const genre = b.genres[i]
        if (filter === 'all genres' || genre === filter) {
          return true
        }
      }
      return false
    })
    return filteredBooks
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks().map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        {genrelist.map(genre => <button key={genre} value={genre} onClick={handleClick}>{genre}</button>)}
      </div>

    </div>
  )
}

export default Books