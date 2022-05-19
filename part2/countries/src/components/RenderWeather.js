import React from 'react'

const RenderWeather = ({ country, weather }) => {

    if (weather.main) {
        return (
            <div>
                <p className="country-detail weather-detail">Weather in {country.capital[0]}</p>

                <p><span className="country-detail">Temperature:</span> {weather.main.temp}&#176; F</p>
                <img className="weather-icon"src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather-icon" />

                <p><span className="country-detail">Wind Speed:</span> {weather.wind.speed}</p>
            </div>
        )
    } else {
        return (
            <p>Loading Temperature...</p>
        )
    }
}

export default RenderWeather


