import React, { useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState('all genres')
  if (!props.show) {
    return null
  }
  const filteredBooks = props.books.filter(book => book.genres.includes(filter))

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filter === 'all genres'
            ? props.books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
              )
            : filteredBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
              )}
        </tbody>
      </table>

      <div>
        in genre {filter}
        <select value={filter} onChange={({ target }) => setFilter(target.value)}>
          {props.books.map(book => (
            book.genres.map(a =>
              <option key={a} value={a}>{a}</option>
            )
          )
          )}
          <option value='all genres'>all genres</option>
        </select>
      </div>

    </div>
  )

}

export default Books