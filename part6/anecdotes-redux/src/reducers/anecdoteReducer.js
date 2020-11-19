import anecdoteService from '../services/ancedote'

const reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'VOTE': {
      return state.map(anec =>
        anec.id !== action.id ? anec : action.data
      )
    }
    case 'NEW_ANECDOTE':{
      return [...state, action.data]
    }
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export const initializeAnec = () => {
  return async dispatch => {
    const anec = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anec,
    })
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const anec = await anecdoteService.create(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anec
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anec = await anecdoteService.updateVote(id)
    dispatch({
      type: 'VOTE',
      data: anec,
      id
    })
  }
}

export default reducer