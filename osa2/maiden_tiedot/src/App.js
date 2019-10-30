import React, { useState, useEffect } from 'react';
import axios from 'axios'


const Filter = ({ handleFilter, filter }) => {
  return (
    <div>
      find countries: <input onChange={handleFilter} value={filter} />
    </div>
  )
}


const WeatherInfo = ({ country }) => {
  const [weather, setWeather] = useState(undefined)

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY // api key for apixu.com
    axios
      .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
  })

  if (weather !== undefined && weather.temperature !== undefined) { // if weather info available
    return (
        <div>
          <h3>Weather in {country.capital}</h3>
          <div><strong>temperature:</strong> {weather.temperature} Celsius</div>
          <div><img alt="Weather icon" src={weather.weather_icons[0]}/></div>
          <div><strong>wind:</strong> {weather.wind_speed} kph direction {weather.wind_dir}</div>
        </div>
    )
  }
  return ( // weather info not available or weather api usage limit reached
    <div>
      <h3>Weather in {country.capital}</h3>
      <p>Weather information not available!</p>
    </div>
  )
}


const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}<br />population {country.population}</p>
      <h3>languages</h3>
      <ul>{country.languages.map((language, i) => <li key={i}>{language.name}</li>)}</ul>
      <img alt="Country flag" src={country.flag} height="200" width="300" />
      <WeatherInfo country={country} />
    </div>
  )
}


const Countrylist = ({ countries, handleFilter }) => {
  const rows = () => countries.map(country => {
    return (
      <div key={country.numericCode}>
        {country.name} <button onClick={handleFilter} value={country.name}>show</button>
      </div>
    )
  })
  return (
    <div>{rows()}</div>
  )
}


const Countries = ({ handleFilter, countries, filter }) => {
  const filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  if (filtered.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (filtered.length !== 1) {
    return <Countrylist countries={filtered} handleFilter={handleFilter} />
  }
  return <Country country={filtered[0]} />
}


const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter handleFilter={handleFilterChange} filter={filter} />
      <Countries handleFilter={handleFilterChange} countries={countries} filter={filter} />
    </div>
  )
}

export default App;