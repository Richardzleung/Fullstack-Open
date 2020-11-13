import React from 'react'

const Logout = ({ setUser,setNotification }) => {
  return (
    <button data-cy='logout' onClick={() => {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setNotification('Signed out')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }}>
      Log out
    </button>
  )
}


export default Logout