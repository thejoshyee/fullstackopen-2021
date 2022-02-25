import { useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number: "123-456-7890"},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState("")

  const namesToShow = persons.filter(person => {
    if (!filterName) {
      return true
    }
    if (person.name.toLowerCase().includes(filterName.toLowerCase())) {
      return true
    } 
  }).map(person => {
      return <div key={person.name}>{person.name} {person.number}</div>
    })

  const handleFilterName = e => {
      setFilterName(e.target.value)
  }


  const handleNameChange = e => {
      setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const addNameAndNumber = e => {
    e.preventDefault()
    const isFound = persons.some(el => el.name === newName)
    console.log(isFound)
    if(!isFound) {
      const personObject = {
        name: newName,
        number: newNumber
        }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already in the phone book!`)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
        <div>
          Filter name shown with <input placeholder="name..." value={filterName} onChange={handleFilterName}/>
        </div>      
        
        <form onSubmit={addNameAndNumber}>
          <h2>Add New Contact</h2>
            <div>
              name: <input placeholder="Add New Person..." value={newName} onChange={handleNameChange}/>
            </div>
               <div>number: <input placeholder="Phone Number..." value={newNumber} onChange={handleNumberChange}/> </div>
            <div>
            <button type="submit">add</button>
          </div>
      </form>

      <h2>Contacts</h2>
      ...
      {namesToShow}
    </div>
  )
}

export default App