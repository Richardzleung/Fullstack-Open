import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import currUserReducer from './reducers/currUserReducer'
import usersReducer from './reducers/usersReducer'
import thunk from 'redux-thunk'


const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  currUser: currUserReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store