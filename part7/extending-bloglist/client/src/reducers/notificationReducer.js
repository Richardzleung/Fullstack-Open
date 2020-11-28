const NotificationReducer = (state = '', action) => {
  //console.log('state' , state)
  //console.log('action' , action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return  { message: action.message, status: action.status }
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

let timeoutId

export const setNotification = (message, status="success") => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      status
    })
    
    if (timeoutId) {
      clearTimeout(timeoutId)
    } 

    timeoutId = setTimeout(() => {
      dispatch({ 
        type: 'CLEAR'
      })
     }, 5000)
  }
}

export default NotificationReducer