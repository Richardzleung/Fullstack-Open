import React, { useState, useEffect } from 'react'
import Blog from './components/BlogAPI'
import BlogForm from './components/BlogForm'
import Login from './components/LoginForm'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification]  = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a,b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong username or pass')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(obj => {
        setBlogs(blogs.concat(obj).sort((a,b) => b.likes - a.likes))
        setNotification(`new blog: ${obj.title} by ${obj.author} added`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => error.message)
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/>
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog'>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification.Notification message={notification}/>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.username} logged in</p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />)
          }
          <Logout setUser={setUser} setNotification={setNotification}/>
        </div>
      }

      {user !== null && blogForm()}

    </div>
  )}

export default App