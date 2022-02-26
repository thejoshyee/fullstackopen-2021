import React from "react"
import { useState } from "react"


const RenderCountry = ({ country }) => {
    const [isDetailsVisible, setIsDetailsVisible] = useState(false)

    const showCountryDetails = (e) => {
        setIsDetailsVisible(!isDetailsVisible)
    }

    const countryLangs = Object.values(country.languages)

    if (!isDetailsVisible) {
        return (
            <div>
                <p>{country.name.common}</p>
                <button onClick={showCountryDetails}>Show Country Info</button>
            </div>
        )
    } else {
        return (
            <div>
                <h1>{country.name.common}</h1>
                <button onClick={showCountryDetails}>Hide Country Info</button>
                
                <p><b>Capital:</b> {country.capital}</p>
                <p><b>Area:</b> {country.area}</p>
                <b>Languages:</b>
                <ul>
                    {countryLangs.map(lang => <li key={lang}>{lang}</li>)}
                </ul>
                <div className="flag">
                    {country.flag}
                </div>
                
            </div>
        )
    }


}

export default RenderCountry


