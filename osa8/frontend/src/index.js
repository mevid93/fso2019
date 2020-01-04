import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'

// https://www.apollographql.com/docs/tutorial/client/#apollo-client-setup
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
});

const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)