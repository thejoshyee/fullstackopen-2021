import React from 'react'
import { useEffect } from 'react'
import personService from '../services/personService'

export default function Persons(props) {
  
  const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name}?`))
      personService
        .deletePerson(person.id)
      personService
        .getAllPersons()
        .then(initialPersons => {
          props.setPersons(initialPersons)
        })
  }
  
  const namesToShow = props.persons.filter(person => {
    if (!props.filterName) {
      return true
    }
    if (person.name.toLowerCase().includes(props.filterName.toLowerCase())) {
      return true
    } 
  }).map(person => {
      return <div key={person.name}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>Delete</button></div>
    })

  return (
    <div>
      {namesToShow}
    </div>
  )
}

