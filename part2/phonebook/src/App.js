import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/personService"
import Notification from "./components/Notification"
import DeleteNotif from "./components/DeleteNotif"


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState("")
  const [updateMessage, setUpdateMessage] = useState(null)
  const [deleteMessage, setDeleteMessage] = useState(null)
  
  
useEffect(() => {
  personService
    .getAllPersons()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
},[])


  const handleFilterName = e => setFilterName(e.target.value)
  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)

  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={updateMessage} setUpdateMessage={setUpdateMessage} />
      <DeleteNotif deleteMessage={deleteMessage} />
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
        updateMesssage={updateMessage}
        setUpdateMessage={setUpdateMessage}
        setDeleteMessage={setDeleteMessage}
      />
      <h2>Contacts</h2>
      <Persons 
        persons={persons} 
        filterName={filterName} 
        setPersons={setPersons}
        setUpdateMessage={setUpdateMessage}
        deleteMessage={deleteMessage}
        setDeleteMessage={setDeleteMessage}
      />
    </div>
  )
}

export default App