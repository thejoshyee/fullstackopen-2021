import React from 'react'
import RenderCountry from './RenderCountry'

const RenderCountriesList = ({ countries, filterQuery }) => {    

    if (!filterQuery) {
        return false
    } else if (countries.length > 10 && filterQuery) {
        return <p className="warning-message">Too many results. Please be more specific...</p>
    } else {
        return (
            countries.map(country => {
            return <RenderCountry 
                key={country.name.common} 
                country={country}
                />
            })
      )
    }
  }

  export default RenderCountriesList