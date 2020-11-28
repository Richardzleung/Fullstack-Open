import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import {
  useRouteMatch, Switch, Route, useHistory, Link
} from "react-router-dom"

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import DisplayAddedBlogs from './components/DisplayUserBlogs'
import DisplayUsersStats from './components/DisplayUsersStats'
import DisplayBlogPost from './components/DisplayBlogPost'

import { userLogin, logout, setUser } from './reducers/currUserReducer'
import { getAllUsers } from './reducers/usersReducer'
import { 
  initializeBlogs, createNewBlog, 
  likeBlog, removeBlog, commentBlog
} from './reducers/blogReducer'

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const blogFormRef = React.createRef()

  const dispatch = useDispatch()
  const notifications = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.currUser)
  const { allUsers, addedBlogs } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(setUser())
    dispatch(initializeBlogs())
    dispatch(getAllUsers())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    await dispatch(userLogin(username, password))
    setUsername('')
    setPassword('')
  }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createNewBlog(blog))
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = async (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(blog.id))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleComment = (id, comment) => {
    dispatch(commentBlog(id, comment))
  }

  const displaySortedBlogs = () => (
    blogs.sort(byLikes).map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  )

  const toggle = () => (
    <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
      <NewBlog createBlog={createBlog} />
    </Togglable>
  )

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(e => e.id === match.params.id)
    : null
  
  if ( !user ) {
    return (
      <div className="Login">
        <h2>login to application</h2>

        <Notification notification={notifications} />

        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button variant="primary" type="submit">
              login
            </Button>
          </Form.Group>
        </Form>

      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
  

  return (
    <Page>
      <h2>blogs</h2>

      <Notification notification={notifications} />
     
      <Alert variant="success">
        <Link to="/">blogs </Link>
        <Link to="/users">users </Link>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </Alert>

      <Switch>
        <Route path="/users/:id">
          <DisplayAddedBlogs dispatch={dispatch} user={addedBlogs} />
        </Route>
        <Route path="/users">
          <DisplayUsersStats users={allUsers} />
        </Route>
        <Route path="/blogs/:id">
          <DisplayBlogPost 
            blog={blog} 
            handleLike={handleLike}
            handleRemove={handleRemove}
            user={user}
            handleComment={handleComment}
          />
        </Route>
        <Route path="/">
          {toggle()}
          {displaySortedBlogs()}
        </Route>
      </Switch>  
    </Page>
  )
}

export default App