import React from 'react'

const Persons = ({filteredList}) => {
    return (
        <ul>
          {filteredList.map(persons =>
            <li key={persons.name}>
              {persons.name} {" "}
              {persons.number} 
            </li>
        )}
        </ul>
    
)}

export default Persons