import React from 'react'

export default function Filter(props) {
  
  return (
    <div>
      Filter name shown with 
      <input
        placeholder="name..." 
        value={props.filterName} 
        onChange={props.handleFilterName}/>
    </div>     
  )
}
