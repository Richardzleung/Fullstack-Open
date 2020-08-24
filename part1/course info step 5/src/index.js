import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <p>{props.course.name}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
        <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part part={props.part.parts[0]} />
      <Part part={props.part.parts[1]} />
      <Part part={props.part.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total.parts[0].exercises 
      + props.total.parts[1].exercises + props.total.parts[2].exercises} </p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content part={course} />
      <Total total={course} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
