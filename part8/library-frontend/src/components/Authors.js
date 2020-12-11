import React, { useState,useEffect } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries' 
import { useMutation } from '@apollo/client'

const Authors = (props) => {
  const [name, setName] = useState(props.authors[0].name)
  const [born, setBirthDate] = useState('') 

  const [ changeAuthor, result ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  useEffect(() => {    
    if (result.data && result.data.editAuthor === null) {      
      props.setError('person not found')    
    }  
  }, [result.data]) // eslint-disable-line 

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    await changeAuthor({ variables: {name, setBornTo:born}})
    setBirthDate('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <form onSubmit={submit}>
        <h3>Set birthyear</h3>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {props.authors.map(a => 
            <option key={a.id} value={a.name}>{a.name}</option>
          )}
        </select>
        <div>
          born 
          <input
            value={born}
            onChange={({ target }) => setBirthDate(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
