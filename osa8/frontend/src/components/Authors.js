import React, { useState } from 'react'

const Authors = ({ show, result, updateAuthor }) => {
  const [author, setAuhtor] = useState('')
  const [year, setYear] = useState('')

  if (!show) {
    return null
  }

  if (result.loading || result.data === undefined) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const handleAuthorUpdate = async (event) => {
    event.preventDefault()
    const born = Number(year)
    await updateAuthor({
      variables: { name: author, born }
    })

    setYear('')
    setAuhtor('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={handleAuthorUpdate}>
        <div>
          name
          <input value={author} onChange={({ target }) => setAuhtor(target.value)} />
        </div>
        <div>
          born
          <input type='number' value={year} onChange={({ target }) => setYear(target.value)} />
        </div>
        <button type='submit' >update author</button>
      </form>

    </div>
  )
}

export default Authors