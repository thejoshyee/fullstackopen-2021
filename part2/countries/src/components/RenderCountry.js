import React from "react"
import { useState } from "react"
import RenderDetails from "./RenderDetails"


const RenderCountry = ({ country }) => {

    // state to show or hide details
    const [isDetailsVisible, setIsDetailsVisible] = useState(false)
    
    // Button - show / hide details
    const showCountryDetails = (e) => {
        setIsDetailsVisible(!isDetailsVisible)
    }

    // country language values
    const countryLangs = Object.values(country.languages)

    if (!isDetailsVisible) {
        return (
            <div className="country-card">
                <p>{country.name.common}</p>
                <button onClick={showCountryDetails}>Show Country Info</button>
            </div>
        )
    } else {
        return (
            <div className="country-card">
                <h1>{country.name.common}</h1>
                <button 
                    onClick={showCountryDetails}>
                    Hide Country Info
                </button>
                <RenderDetails country={country} countryLangs={countryLangs} />
            </div>
        )
    }
}

export default RenderCountry


