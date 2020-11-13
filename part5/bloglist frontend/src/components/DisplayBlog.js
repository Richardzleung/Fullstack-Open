import React from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const DisplayBlog = ({ blog, user, toggle, visibility, showWhenVisibile, hideWhenVisible, addLike, deleteBlog }) => {
  return (
    <div data-cy="blog" style={blogStyle}>

      <div className='titleAuthor'>
        {blog.title} {blog.author}
      </div>

      <div style ={hideWhenVisible}>
        <button data-cy="view" onClick={toggle}>View</button>
      </div>

      <div style={showWhenVisibile}>
        {visibility &&
          <div>
            <button onClick={toggle}>hide</button> <br/>
            {blog.url} <br/>
            <div data-cy="likes"> {blog.likes} </div>
            <button data-cy="likeButton" onClick={addLike}>like</button> <br/>
            {blog.user.username}
            {blog.user.username === user.username && <button data-cy="delete" onClick={() => deleteBlog(blog.id)}>remove</button>} <br/>
          </div>
        }
      </div>
    </div>
  )
}

export default DisplayBlog