import React from 'react'
import Weather from './Weather.js'

const DisplayCountry = ({ filteredList, weather,setWeather}) => {
    // values to display
    const name = filteredList.map(coun => coun.name)
    const population = filteredList.map(coun => coun.population)
    const capital = filteredList.map(coun => coun.capital)
    const languages = filteredList.map(coun => coun.languages)
    const flag = filteredList.map(coun => coun.flag)

    return (
        <div>
            <h1> {name} </h1>
                Capital: {' '} {capital} <br/>
                Population: {' '} {population}
            <h3> Spoken Languages </h3>
            <ul>
                {languages[0].map(item => (
                    <li key={item.name}>{item.name}</li> ))}
            </ul>
            <img src={flag} alt="flag" height="110" width="70"/>
            {<Weather capital={String(capital)} setWeather={setWeather} weather={weather}/>}
        </div>
    )
}

export default DisplayCountry