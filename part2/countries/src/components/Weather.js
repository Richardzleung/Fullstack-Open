import React, { useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital , setWeather,weather}) => {
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => {
                setWeather(response.data.current)
            })
    }, [capital,setWeather])
    console.log('weather' , weather)

    if (!weather) return null
    
    return (
        <div>
            <h3> Weather in {capital} </h3>
                Temperature: {weather.temperature} Celsius <br/>
                <img src={weather.weather_icons} alt="weather conditions" /> <br />
                 Wind: {weather.wind_speed} mph direction {weather.wind_dir}
        </div>
    )
}

export default Weather