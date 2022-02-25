import { useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"


const App = () => {
  // mock data
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number: "123-456-7890"},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  // state
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState("")

  //event handlers
  const handleFilterName = e => setFilterName(e.target.value)
  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
        filterName={filterName}
        handleFilterName={handleFilterName}
      />
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        persons={persons}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Contacts</h2>
      <Persons 
        persons={persons} 
        filterName={filterName} 
      />
    </div>
  )
}

export default App