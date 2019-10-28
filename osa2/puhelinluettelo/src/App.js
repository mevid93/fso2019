import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  // lisätään henkilö
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    if (persons.filter(person => person.name === personObject.name).length > 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  // lisättävän nimen muokkaus
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const rows = () => {
    return persons.map(person => <p key={person.name}>{person.name}</p>)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )

}

export default App