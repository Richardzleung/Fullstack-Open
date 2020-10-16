import React from 'react'
import DisplayCountry from './DisplayCountry.js'
import SelectCountry from './SelectCountry.js'

const Countries = ({ input, countries , weather, setWeather,setInput}) => {
  const filteredCountries = countries.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
  if (filteredCountries.length === 250) return <div></div>
  else if (filteredCountries.length === 1) return <DisplayCountry filteredList={filteredCountries} weather={weather}setWeather={setWeather}/>
  else if (filteredCountries.length <= 10) return <SelectCountry filteredCountries={filteredCountries} setInput={setInput}/>
  else return <div> Too many matches, specify another filter </div>
}

export default Countries