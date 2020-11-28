import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const BlogReducer = (state = [], action) => {
  console.log('blog state' , state)
  console.log('blog action' , action)
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data
    case "NEW_BLOG":
      return [...state, action.data]
    case "UPDATE_BLOG":
      return state.map(b => b.id === action.data.id ? action.data : b)
    case "REMOVE_BLOG":
      return state.filter(b => b.id !== action.id)
  default:
    return state
  }
}

export const initializeBlogs =  () => {
  return async dispatch => {
    const initialBlogs = await blogService.getAll()
    
    dispatch({
      type: "INIT_BLOGS",
      data: initialBlogs,
    })
  } 
}

export const createNewBlog = blog => {
  return async dispatch => {
    const newBLog = await blogService.create(blog)
    console.log('newblog', newBLog)
    
    dispatch({
      type: "NEW_BLOG",
      data: newBLog
    })
    dispatch(setNotification(`${blog.title} created!`))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user }
    await blogService.update(likedBlog)
    dispatch({
      type: "UPDATE_BLOG",
      data: likedBlog
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.comment(id, comment)
    console.log('update', updatedBlog)
    dispatch({
      type: "UPDATE_BLOG",
      data: updatedBlog
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type:"REMOVE_BLOG",
      id
    })
  }
}

export default BlogReducer