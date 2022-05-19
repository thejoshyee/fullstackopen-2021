import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import RenderWeather from "./RenderWeather"

const RenderDetails = ({ country ,countryLangs }) => {


  // state for weather
  const [weather, setWeather] = useState([])

  // const api_key = process.env.REACT_APP_API_KEY
  // http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}&units=f

  useEffect(() => {
      axios
          .get(`https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${country.capital[0]}&units=imperial`)
          .then(response => {
              setWeather(response.data)
            }
      )}, [])

  return (
    <div className="country-card-details" >
        <p><span className="country-detail">Capital:</span> {country.capital}</p>
        <p><span className="country-detail">Area:</span> {country.area}</p>
        <p><span className="country-detail">Languages:</span></p>
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


