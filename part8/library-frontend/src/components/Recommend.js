import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { FILTER_BOOKS_BY_GENRE } from '../queries'

const Recommend = ({ own, show, books }) => {
  const [filter, setFilter] = useState('')
  const [getRecommended, { called, loading, data }] = useLazyQuery(FILTER_BOOKS_BY_GENRE)
  useEffect(() => {  
    if(own.data.me){
      setFilter(own.data.me.favoriteGenre)
    }
    getRecommended({ variables: { genre: filter} })
  },[filter, books]) //eslint-disable-line
  
  if (!show) {
    return null
  }
  if (loading && called)  {
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <strong>{filter}</strong>
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
          {data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommend