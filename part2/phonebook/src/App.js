import React, { useState , useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phoneService from './services/phonebook'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([
    /*
    { name: 'Arto Hellas' , number: '040-1234567'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' } */
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')
  const [notification, setNotification] = useState(null)
  const handleNameChange = (event) => setNewName(event.target.value)  
  const handleNumberChange = (event) => setNewNumber(event.target.value)  
  const handleFilterChange = (event) => setNewFilter(event.target.value)  
  
  useEffect(() => {
    phoneService
      .getAll()
      .then(initalPhonebook => {
        setPersons(initalPhonebook)
      })
  }, [])

  const addName= (event) => {   
    event.preventDefault()
    if (persons.some(entry => entry.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const person = persons.find(n => n.name === newName)
        const changedEntry = { ...person, number:newNumber }
        // console.log('changed entry' , changedEntry)
        phoneService
          .updateNumber(person.id,changedEntry)
          .then(returnedPhonebook => {
            setPersons(persons.map(entry => entry.id !== person.id ? entry : returnedPhonebook))
            setNotification(`Updated ${newName}`)
            setTimeout(()=>{
              setNotification(null)
            },1500)
          })
          .catch(error => {
            setNotification(`the entry '${newName}' was already deleted from server`)
            setTimeout(()=>{
              setNotification(null)
            },3500)
            //setPersons(persons.filter(n => n.id !== person.id)) 
          })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }    
      phoneService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNotification(`Added ${newName}`)
          setTimeout(()=>{
            setNotification(null)
          },1500)
          setNewName('')
          setNewNumber('')
          setNewFilter('')
        })
        .catch(error => {
          console.log('fail')
        })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        addName={addName}
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deleteEntry={phoneService.deleteEntry} setPersons={setPersons} people={persons}/>
    </div>
  )
}

export default App