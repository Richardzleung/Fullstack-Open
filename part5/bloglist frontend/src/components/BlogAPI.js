import React, { useState } from 'react'
import blogService from '../services/blogs'
import DisplayBlog from './DisplayBlog'

const Blog = ({ blog, blogs, setBlogs, user, setNotification }) => {
  const [visibility, setVisiblity] = useState(false)
  const hideWhenVisible = { display: visibility ? 'none': '' }
  const showWhenVisibile = { display: visibility ? '' : 'none' }

  const toggle = () => {
    setVisiblity(!visibility)
  }

  const addLike = () => {
    // eslint-disable-next-line no-unused-vars
    const { user, ...obj } = blog
    const newObj = { ...obj, likes:blog.likes + 1 }
    blogService
      .update(blog.id, newObj)
      .then(response => {
        const updatedBlogs = blogs.map(e => e.id !== blog.id ? e : response)
        setBlogs(updatedBlogs.sort((a,b) => b.likes - a.likes))
      })
      .catch(error => console.error(error))
  }

  const deleteBlog = id => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter(e => e.id !== blog.id))
          setNotification(`${blog.title} deleted`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  return (
    <DisplayBlog 
      blog={blog} 
      user={user} 
      toggle={toggle} 
      visibility={visibility} 
      showWhenVisibile={showWhenVisibile} 
      hideWhenVisible={hideWhenVisible}
       addLike={addLike} 
       deleteBlog={deleteBlog}
    />
  )
}
export default Blog
