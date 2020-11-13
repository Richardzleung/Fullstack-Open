import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, setUsername, password, setPassword,handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <div>
    username:
        <input type="text" value={username} name="Username" data-cy="username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
    password:
        <input type="password" value={password} name="Password" data-cy="password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit" data-cy="login">login</button>
    </form>
  )}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
