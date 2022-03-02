import React from 'react'
import personService from "../services/personService"

export default function PersonForm(props) {
  const addNameAndNumber = e => {
    e.preventDefault()
    const isFound = props.persons.some(el => el.name === props.newName)
    if(!isFound) {
      const personObject = {
        name: props.newName,
        number: props.newNumber
        }
      
      personService
        .createPerson(personObject)
        .then(returnedPerson => {
          props.setPersons(props.persons.concat(returnedPerson))
          props.setNewName('')
          props.setNewNumber('')
        })

    } else {
      alert(`${props.newName} is already in the phone book!`)
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
