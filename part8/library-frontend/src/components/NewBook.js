import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, 
  ALL_AUTHORS, 
} from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(ADD_BOOK, {
    //refetchQueries: [{ query: ALL_AUTHORS }, {query: ALL_BOOKS}],
    onError: (error) => {
      props.setError(error.graphQLErrors.message)
    },
    update: (store, response) => {
      console.log('response', response)
      const dataInAuthors = store.readQuery({ query: ALL_AUTHORS })
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...dataInAuthors,
          allAuthors: [...dataInAuthors.allAuthors, response.data.addBook.author]
        }
      })
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    await createBook({ variables: { title, name, published, genres }})

    setTitle('')
    setPublished('')
    setName('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook