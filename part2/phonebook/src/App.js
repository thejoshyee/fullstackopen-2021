import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from "axios"


const App = () => {
  // mock data
  const [persons, setPersons] = useState([]) 
  // state
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState("")

  //use effect
useEffect(() => {
  axios
    .get("http://localhost:3001/persons")
    .then(res => {
      setPersons(res.data)
    })
},[])

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