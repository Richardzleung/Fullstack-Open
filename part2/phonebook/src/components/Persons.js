import React from 'react'

const Persons = ({persons, filter ,deleteEntry,setPersons,people}) => {
  //onDeleteEntry()
  const filteredList = !filter
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))


  return (
      <ul>
        {filteredList.map(persons =>
          <li key={persons.name} className='people'>
            {persons.name} {" "}
            {persons.number} {" "}
            <input type="button" onClick={()=>deleteEntry(persons,setPersons,people)} value='delete'/>
          </li>
      )}
      </ul>
)}

export default Persons