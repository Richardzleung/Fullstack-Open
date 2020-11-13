import React,  { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setURL(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setURL('')
    setAuthor('')
  }

  return (
    <form onSubmit={addBlog} className="formDiv">
      <h2>Create New:</h2>
      <div>
        title: <input type="text" id='title' value={title} onChange={handleTitleChange}/>
      </div>
      <div>
        author: <input type="text" id='author' value={author} onChange={handleAuthorChange}/>
      </div>
      <div>
        url: <input type="text" id='url' value={url} onChange={handleURLChange}/>
      </div>
      <button type="submit" data-cy="create" >create</button>
    </form>
  )
}

export default BlogForm