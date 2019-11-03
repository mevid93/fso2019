import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Filter = ({ handleFilterChange, filter }) => {
  return (
    <div>
      filter shown with: <input onChange={handleFilterChange} value={filter} />
    </div>
  )
}


const PersonForm = ({ addPerson, handleNameChange, handleNumberChange, newName, newNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const Persons = ({ persons, filter }) => {
  let p = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  p = p.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  return (<div>{p}</div>)
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // alkutila --> haetaan data kannasta
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // lisätään henkilö
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.filter(person => person.name === personObject.name).length > 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
    setNewName('')
    setNewNumber('')
  }

  // lisättävän nimen muokkaus
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // lisättävän puhelinnumeron muokkaus
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // filtterin muokkaus
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />

      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )

}

export default App