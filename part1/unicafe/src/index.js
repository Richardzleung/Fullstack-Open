import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//const Average = (props) => (props.good - props.bad) / props.all
//const Positive = ({good , all}) => good / all

const Statistics = (props) => {
  /// ...
  const {good, bad, neutral} = props
  let all = good + bad + neutral
  if (all === 0) return <div> No Feedback Given </div>
  
  return(
    <div>
      <table>
          <td>good</td> <td><Statistic text="good" value ={good}/></td>
        <tr> 
          <td>neutral</td> <td><Statistic text="neutral" value ={neutral}/></td></tr>
        <tr> 
          <td>bad</td> <td><Statistic text="bad" value ={bad}/></td></tr>
        <tr>
          <td>all</td> <td><Statistic text="all" value ={all}/></td></tr>
        <tr>
          <td>average</td> <td><Statistic text="average" value ={good} bad={bad} all={all}/></td></tr>
        <tr>
          <td>positive</td><td><Statistic text="positive" value ={good} all={all}/></td></tr>
      </table>
    </div>
  )
}


const Statistic = (props) => {  
    const {value , all} = props
    if (props.text === "good") return <div> {value} </div>
    if (props.text === "neutral") return <div> {value} </div>
    if (props.text === "bad") return <div>  {value} </div>
    if (props.text === "all") return <div>  {value} </div>
    if (props.text === "average") return <div> {(value - props.bad) / all} </div>
    if (props.text === "positive") return <div> {(value / all) * 100} % </div>
}

const Button = (props) => {
  const {good , neutral , bad , setGood , setNeutral , setBad} = props
  return (
    <div>
      <h2> Give Feedback</h2>
        <button onClick={() => setGood(good + 1)}> good </button>
        <button onClick={() => setNeutral(neutral + 1)}> neutral </button>
        <button onClick={() => setBad(bad + 1)}> bad </button>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <Button good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad}/>
        <h2> Statistics </h2>
        <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
 }

ReactDOM.render(<App />, 
  document.getElementById('root')
)
