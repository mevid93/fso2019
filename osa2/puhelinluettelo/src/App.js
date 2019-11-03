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


const Person = ({ person, deleteMethod }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={() => deleteMethod(person.id)}>delete</button>
    </div>
  )
}


const Persons = ({ persons, filter, deleteMethod }) => {
  let p = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  p = p.map(person => <Person key={person.id} person={person} deleteMethod={deleteMethod} />)
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
      .then(initialPersons => {
        setPersons(initialPersons)
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
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson.data))
      })
    setNewName('')
    setNewNumber('')
  }

  // poistetaan henkilö
  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(id)
      .then(response =>
        setPersons(persons.filter(person => person.id !== id))
      )
    }
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
      <Persons persons={persons} filter={filter} deleteMethod={deletePerson} />
    </div>
  )

}

export default App