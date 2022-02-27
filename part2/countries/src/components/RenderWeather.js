import React from 'react'

const RenderWeather = ({ country, weather }) => {
    if (weather.current) {
        return (
            <div>
                <h3>Weather in {country.capital}</h3>
                <p><b>Temperature: {weather.current.temperature}</b></p>
                <img className="weather-icon"src={`${weather.current.weather_icons[0]}`} alt="weather-icon" />
                <p><b>Wind Speed: {weather.current.wind_speed}</b></p>
            </div>
        )
    } else {
        return (
            <p>Loading Temperature...</p>
        )
    }
}

export default RenderWeather


