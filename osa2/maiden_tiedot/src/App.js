import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Filter = ({ handleFilter, filter }) => {
  return (
    <div>
      find countries: <input onChange={handleFilter} value={filter} />
    </div>
  )
}


const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>
        capital {country.capital}
        <br />
        population {country.population}
      </p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language, i) => <li key={i}>{language.name}</li>)}
      </ul>
      <img alt="Country flag" src={country.flag} height="200" width="300" />
    </div>
  )
}


const Countries = ({ countries, filter }) => {
  const filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  if (filtered.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (filtered.length !== 1) {
    return (<div>{filtered.map(country => <div key={country.numericCode}>{country.name}</div>)}</div>)
  }
  return <Country country={filtered[0]} />
}


const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  // alkutila --> hae maiden data rest-rajapinnasta
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // filtterin muutos
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter handleFilter={handleFilterChange} filter={filter} />
      <Countries countries={countries} filter={filter} />
    </div>
  )
}

export default App;