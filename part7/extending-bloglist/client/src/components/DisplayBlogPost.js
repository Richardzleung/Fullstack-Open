import React from 'react'
import styled from 'styled-components'
import { useField, removeReset } from '../hooks/index'
import { useParams } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`
const DisplayBlogPost = ({ blog, handleLike, handleRemove, user, handleComment }) => {
  const id = useParams().id
  const comment = useField('comment')

  const handleNewComment = (event) => {
    event.preventDefault()
    handleComment(id, comment.value)
    comment.resetField()
  }

  if(!blog){
    return null
  }

  const own= user.username===blog.user.username
  console.log('blog', blog)
  return (
    <div style={blogStyle} className='DisplayBlog'>
      <h2> <i>{blog.title}</i> by {blog.author} </h2>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>added by {blog.user.username}</div>
      {own && <button onClick={() => handleRemove(blog)}>remove</button>}

      <form onSubmit={handleNewComment}>
        <input {...removeReset(comment)} /> 
        <Button id="comment">add comment</Button>
      </form>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default DisplayBlogPost