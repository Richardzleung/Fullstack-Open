import loginService from '../services/login'
import storage from '../utils/storage'
import { setNotification } from './notificationReducer'

const UserReducer = (state = '', action) => {
  //console.log('user state' , state)
  //console.log('user action' , action)
  switch (action.type) {
    case "SET_USER": 
      return action.data
    case "LOGOUT":
      return action.data
    default:
      return state
  }
}

export const setUser = () => {
  const user = storage.loadUser()
  return {
    type: "SET_USER",
    data: user
  }
}

export const userLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })
      storage.saveUser(user)
      dispatch(setNotification(`${user.username} welcome back!`))
      dispatch({
        type:"SET_USER",
        data: user
      })
    } catch (e) {
      dispatch(setNotification('wrong username/password', 'error'))
    }
  }
}

export const logout = () => {
  storage.logoutUser()
  return {
    type: "LOGOUT",
    data: null
  }
}
export default UserReducer