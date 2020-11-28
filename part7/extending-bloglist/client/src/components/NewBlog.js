import React from 'react'
import { useField, removeReset } from '../hooks/index'

const NewBlog = (props) => {
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title: title.value, 
      author: author.value,
      url: url.value
    })

    title.resetField()
    author.resetField()
    url.resetField()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          author: <input {...removeReset(author)} />
        </div>
        <div>
          title: <input {...removeReset(title)} />
        </div>
        <div>
          url: <input {...removeReset(url)} />
        </div>
        <button id="create">create</button>
      </form>
    </div>
  )
}

export default NewBlog