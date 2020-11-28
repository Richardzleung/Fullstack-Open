import usersService from '../services/users'
// import { setNotification } from './notificationReducer'

const usersReducer = (state = {}, action) => {
  console.log('users state' , state)
  console.log('users action' , action)
  switch (action.type) {
    case "INIT_USERS": 
      return { allUsers: action.data, addedBlogs:state.addedBlogs }
    case "GET_TARGET_USER":
      return { allUsers: state, addedBlogs: action.data }
    default:
      return state
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: "INIT_USERS",
      data: users
  })
  }
}

export const getUserBlogs = id => {
  return async dispatch => {
    const userBlogs = await usersService.getUserBlogs(id)

    console.log('userdata', userBlogs)

    dispatch({
      type: "GET_TARGET_USER",
      data: userBlogs
    })
  }
}

export default usersReducer