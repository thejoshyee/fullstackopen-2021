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
              props.setDeleteMessage(`${error.response.data.error}`)
              // props.setPersons(props.persons.filter(p => p.id !== existingPerson.id))
              setTimeout(() => {
                props.setDeleteMessage(null)
              }, 4000)
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
            }).catch(error => {
                props.setDeleteMessage(`${error.response.data.error}`)
                setTimeout(() => {
                  props.setDeleteMessage(null)
                }, 3000)
            }
            )} 
    }
  }

  return (
    <div>
      <form onSubmit={addNameAndNumber}>
          <h2>Add New Contact</h2>
            <div>
              Name: <input placeholder="Add New Person..." value={props.newName} onChange={props.handleNameChange}/>
            </div>
               <div>Number: <input placeholder="Phone Number..." value={props.newNumber} onChange={props.handleNumberChange}/> </div>
            <div>
            <button type="submit">Add Contact</button>
          </div>
      </form>
    </div>
  )
}
