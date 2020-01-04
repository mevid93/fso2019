import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
    id
  }
}
`
const ALL_BOOKS = gql`
{
  allBooks  {
    title
    author
    published
    id
  }
}
`
const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    id
  }
}
`

const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $born
  ) {
    name
    born
    id
  }
} 
`
const handleError = (error) => {
  console.log(error)
}

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [addBook] = useMutation(CREATE_BOOK, { onError: handleError, refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }] })
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, { onError: handleError })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        result={authors}
        updateAuthor={updateAuthor}
        show={page === 'authors'}
      />

      <Books
        result={books}
        show={page === 'books'}
      />

      <NewBook
        addBook={addBook}
        show={page === 'add'}
      />

    </div>
  )
}

export default App