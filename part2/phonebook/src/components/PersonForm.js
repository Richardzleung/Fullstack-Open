import React from 'react'

const PersonForm = (props) => {
  const {persons,setNewFilter,setNewName,
          setNewNumber, setPersons, newName, newNumber, 
          handleNameChange,handleNumberChange} = props

  const addName= (event) => {   
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } 
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }    
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      setNewFilter('')
    }
  }
    return (
    <form onSubmit={addName}>
        <div>
          name: 
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
    </form>
)}

export default PersonForm
