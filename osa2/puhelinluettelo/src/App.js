import React, { useState } from 'react'


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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
    setPersons(persons.concat(personObject))
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