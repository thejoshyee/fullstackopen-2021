import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import RenderWeather from "./RenderWeather"

const RenderDetails = ({ country ,countryLangs }) => {

  const api_key = process.env.REACT_APP_API_KEY

  // state for weather
  const [weather, setWeather] = useState([])

  useEffect(() => {
      axios
          .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}&units=f`)
          .then(response => {
              setWeather(response.data)
            }
      )}, [])
    
  return (
    <div>
        <p><b>Capital:</b> {country.capital}</p>
        <p><b>Area:</b> {country.area}</p>
        <b>Languages:</b>
            <ul>
                {countryLangs.map(lang => <li key={lang}> {lang} </li>)}
            </ul>
            <div className="flag">
                {country.flag}
            </div>
          <RenderWeather country={country} weather={weather}/>
    </div>
  )
}

export default RenderDetails


