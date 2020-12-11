import { gql } from '@apollo/client'

export const ALL_AUTHORS=gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

export const ALL_BOOKS=gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
      }
      id
      genres
    }
  }
`
export const FAVORITE_GENRE=gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
export const FILTER_BOOKS_BY_GENRE=gql`
  query getFilterBooks($genre: String!){
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const ADD_BOOK=gql`
  mutation createBook($title: String!, $published: Int!, $name: String!, $genres: [String!]!){
    addBook(title: $title, published: $published, name: $name, genres: $genres) {
      title
      published
      genres
      author {
        name
        born
      }
    }
  }
`

export const EDIT_AUTHOR=gql`
  mutation changeAuthor($name: String!, $setBornTo: Int!){
    editAuthor(name: $name,setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const BOOK_ADDED = gql`  subscription {    
  bookAdded {      
    title
    author {
      name
    }
    id
  }  
} 
`