import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [allPoints, setPoints] = useState(() => Array(props.anecdotes.length).fill(0))
  const [max, setMax] = useState(0)
  // generates random anecdotes
  const handleRandom = () => {
    setSelected(Math.floor(Math.random() * 6))
    handleMax()
  }
  const handleMax = () => setMax(allPoints.indexOf(Math.max(...allPoints)))

  const handleVote = () => {
    const copy = [...allPoints]
    copy[selected] += 1
    setPoints(copy)
  }

  console.log('max' , allPoints[max])

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]} <br/> 
      has {allPoints[selected]} votes 
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleRandom} text='next anecdote' />
      <h2>Anecdote with the most votes</h2>
      {props.anecdotes[max]} has {allPoints[max]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)