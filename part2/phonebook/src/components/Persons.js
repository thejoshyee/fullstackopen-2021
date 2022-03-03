import React from 'react'
import personService from '../services/personService'

export default function Persons(props) {
  
  const deletePersonBtn = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
      .deletePerson(id)
      .then(() => {
        props.setPersons(props.persons.filter(person => person.id !== id))
      })
      props.setDeleteMessage(`${name} has been deleted!`)
      setTimeout(() => {
        props.setDeleteMessage(null)
      }, 3000) 
    } else {
      return false
    }
  }
  
  const namesToShow = props.persons.filter(person => {
    if (!props.filterName) {
      return true
    }
    if (person.name.toLowerCase().includes(props.filterName.toLowerCase())) {
      return true
    } 
  }).map(person => {
      return <div key={person.name}>{person.name} {person.number} <button onClick={() => deletePersonBtn(person.id, person.name)}>Delete</button></div>
    })

  return (
    <div>
      {namesToShow}
    </div>
  )
}

