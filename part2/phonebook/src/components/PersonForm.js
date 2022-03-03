import React from 'react'
import personService from "../services/personService"

export default function PersonForm(props) {

  const addNameAndNumber = e => {
    if(props.newName.length === 0 || props.newNumber.length === 0) {
      alert("You can't have empty fields.")
    } else {
        e.preventDefault()
        const found = props.persons.some(el => el.name === props.newName && el.number === props.newNumber)
        const newPerson = {name: props.newName, number: props.newNumber}
        const existingPerson = props.persons.filter(person => person.name === newPerson.name)[0]
    
        if(existingPerson) {
          if(window.confirm(`${props.newName} has already been added to your phonebook, replace the old number with the new one?`))
          personService
            .updatePerson(existingPerson.id, newPerson)
            .then(response => {
              props.setPersons(props.persons.map(person => person.id !== existingPerson.id ? person : response))
              props.setUpdateMessage(`Updated ${existingPerson.name}'s phone number.`)
              setTimeout(() => {
                props.setUpdateMessage(null)
              }, 3000)
            })
            .catch(error => {
              console.log("Error", error)
            })
    
        } else if(!found) {
          personService
            .createPerson(newPerson)
            .then(returnedPerson => {
              props.setPersons(props.persons.concat(returnedPerson))
              props.setNewName('')
              props.setNewNumber('')
              props.setUpdateMessage(`Added ${returnedPerson.name} to your phonebook.`)
              setTimeout(() => {
                props.setUpdateMessage(null)
              }, 3000)
            }).catch(error => console.log("Error", error))
        } 
    }
  }

  return (
    <div>
      <form onSubmit={addNameAndNumber}>
          <h2>Add New Contact</h2>
            <div>
              name: <input placeholder="Add New Person..." value={props.newName} onChange={props.handleNameChange}/>
            </div>
               <div>number: <input placeholder="Phone Number..." value={props.newNumber} onChange={props.handleNumberChange}/> </div>
            <div>
            <button type="submit">add</button>
          </div>
      </form>
    </div>
  )
}
