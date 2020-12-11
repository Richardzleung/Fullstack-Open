import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useQuery,useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, FAVORITE_GENRE, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books =  useQuery(ALL_BOOKS)
  const me = useQuery(FAVORITE_GENRE)
  const client = useApolloClient()

  useEffect(() => {
    const existingToken = localStorage.getItem('library-user-token')
    if (existingToken) {
      setToken(existingToken)
    }
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log('data', dataInStore)
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook =  subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} by ${addedBook.author.name} added!`)
      updateCacheWith(addedBook)
    }
  })

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {    
    setErrorMessage(message)    
    setTimeout(() => {      
      setErrorMessage(null)    
    }, 10000)  
  }

  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore()  
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token 
          ? <button onClick={() => setPage('login')}>login</button>
          : <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={logout}>logout</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
            </>
        }
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors.data.allAuthors}
        setError={notify}
      />

      <Books
        show={page === 'books'}
        books={books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
      />

      <Recommend 
        show={page === 'recommend'}
        own={me}
        books={books.data.allBooks}
      />
    </div>
  )
}

const Notify = ({errorMessage}) => {  
  if ( !errorMessage ) {    
    return null  
  }  
  return (    
  <div style={{color: 'red'}}>    
  {errorMessage}    
  </div>  
  )
}

export default App