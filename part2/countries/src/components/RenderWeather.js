import React from 'react'

const RenderWeather = ({ country, weather }) => {
    if (weather.current) {
        return (
            <div>
                <p className="country-detail weather-detail">Weather in {country.capital}</p>

                <p><span className="country-detail">Temperature:</span> {weather.current.temperature}&#176; F</p>
                <img className="weather-icon"src={`${weather.current.weather_icons[0]} `} alt="weather-icon" />

                <p className="country-detail"><span>Wind Speed:</span> {weather.current.wind_speed}</p>
            </div>
        )
    } else {
        return (
            <p>Loading Temperature...</p>
        )
    }
}

export default RenderWeather


