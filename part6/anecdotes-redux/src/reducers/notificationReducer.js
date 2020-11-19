import { timeoutCollection } from 'time-events-manager'

const NotificationReducer = (state = '', action) => {
  // console.log('noti' , state)
  // console.log('noti2' , action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const setNotification = (content, seconds) => {
  timeoutCollection.removeAll()
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
    setTimeout(() => {
      dispatch({ 
        type: 'CLEAR'
      })
     }, seconds * 1000);
  }
}

export default NotificationReducer