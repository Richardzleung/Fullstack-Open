import React, { useEffect } from 'react'
import { getUserBlogs } from '../reducers/usersReducer'
import { useParams } from 'react-router-dom'


const DisplayAddedBlogs = ({ dispatch, user }) => {
  const id = useParams().id

  useEffect(() => {
    dispatch(getUserBlogs(id))
  },[dispatch, id])
  

  if (!user) {
    return null
  }
  // return (<div></div>)
  return (
    <div>
      <h3>{user.username}</h3>
      <h4>added blogs</h4>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.author}</li>
          ))}
        </ul>
    </div>
  )
}

export default DisplayAddedBlogs