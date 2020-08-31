import React from 'react';

const Course = ({course}) => {
    const total = course.parts.reduce((sum, parts) => sum + parts.exercises, 0)
    const content = course.parts.map(parts => 
      <ul key={parts.id}>
        <li >
          {parts.name} {parts.exercises}
        </li> 
      </ul>)
    return (
    <div>
      <h2>
           {course.name}
      </h2>
          {content}
  
          <h3>total of {total} exercises</h3>
    </div>
    )
  }

  export default Course