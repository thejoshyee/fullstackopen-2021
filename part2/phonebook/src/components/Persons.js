import React from 'react'

export default function Persons(props) {
  
  const namesToShow = props.persons.filter(person => {
    if (!props.filterName) {
      return true
    }
    if (person.name.toLowerCase().includes(props.filterName.toLowerCase())) {
      return true
    } 
  }).map(person => {
      return <div key={person.name}>{person.name} {person.number}</div>
    })

  return (
    <div>
      {namesToShow}
    </div>
  )
}
