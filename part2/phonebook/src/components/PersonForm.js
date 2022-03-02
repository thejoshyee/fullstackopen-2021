import React from 'react'
import personService from "../services/personService"

export default function PersonForm(props) {



  const addNameAndNumber = e => {
    e.preventDefault()
    const found = props.persons.some(el => el.name === props.newName && el.number === props.newNumber)
    const newPerson = {name: props.newName, number: props.newNumber}
    const existingPerson = props.persons.filter(person => person.name === newPerson.name)[0]
    console.log(existingPerson)

    if(existingPerson) {
      if(window.confirm(`${props.newName} is already added to phonebook, replease the old number with a new one?`))
      personService
        .updatePerson(existingPerson.id, newPerson)
        .then(response => {
          props.setPersons(props.persons.map(person => person.id !== existingPerson.id ? person : response))
          alert(`Updated ${existingPerson.name}'s phone number.`)
        })

    } else if(!found) {
      personService
        .createPerson(newPerson)
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
