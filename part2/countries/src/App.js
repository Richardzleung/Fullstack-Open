import React, { useState, useEffect } from 'react';
import Search from './components/Search.js'
import Countries from './components/Countries.js'
import axios from 'axios'

function App() {
  const [input, setInput] = useState('')
  const [weather, setWeather] = useState(null);
  const [countries, setCountries] = useState([])
  const handleInput = (event) => setInput(event.target.value)

  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
       // console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Search input={input} handleInput={handleInput} />
      <Countries input={input} countries={countries} setInput={setInput} weather={weather} setWeather={setWeather}/>
    </div>
  );
}

export default App;
