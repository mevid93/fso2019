import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const USER = gql`
{
  me {
    username
    favoriteGenre
    id
  }
}
`

const Recommend = ({ show, resultBooks }) => {
  const [user, setUser] = useState(undefined)
  const client = useApolloClient()

  if (!show) {
    return null
  }

  if (resultBooks.data === undefined || resultBooks.data === undefined) {
    return <div>loading...</div>
  }

  const books = resultBooks.data.allBooks

  // fetch user info when visiting recommend page...
  // otherwise there would be error when user goes to recommend after login
  const currentUser = async (name) => {
    const { data } = await client.query({
      query: USER
    })
    setUser(data.me)
  }

  if (user === undefined || user === null) {
    currentUser()
    return <div>loading...</div>
  }

  const filteredBooks = () => {
    const filteredBooks = books.filter(b => {
      for (let i = 0; i < b.genres.length; i++) {
        const genre = b.genres[i]
        if (genre === user.favoriteGenre) {
          return true
        }
      }
      return false
    })
    return filteredBooks
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <strong>{user.favoriteGenre}</strong></p>

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

    </div>
  )
}

export default Recommend