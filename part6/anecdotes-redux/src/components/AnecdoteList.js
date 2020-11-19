import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { voteAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const sortedAnecdotes = [...props.anecdotes].sort((a,b) => b.votes - a.votes)
  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              props.voteAnecdote(anecdote.id)
              props.setNotification(`you voted '${anecdote.content}'`, 5)
              }
            }>vote</button>
          </div>
        </div>
      )}
      </div>
  )
}

const mapStateToProps = (state) => {  
  if (state.filter === 'ALL') {
    return {
      anecdotes: state.anecdotes
    }
  }
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  }
}

const mapDispatchToProps ={
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList