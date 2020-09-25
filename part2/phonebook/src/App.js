import React, { useState , useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    {/*
    { name: 'Arto Hellas' , number: '040-1234567'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' } */}
  ]) 

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)  
  const handleNumberChange = (event) => setNewNumber(event.target.value)  
  const handleFilterChange = (event) => setNewFilter(event.target.value)  
  
  const filteredList = !filter
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm 
        persons={persons}
        setPersons={setPersons}
        newNumber={newNumber} 
        setNewNumber={setNewNumber}
        newName={newName} 
        setNewName={setNewName}
        setNewFilter={setNewFilter}
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons filteredList={filteredList}/>
    </div>
  )
}

export default App