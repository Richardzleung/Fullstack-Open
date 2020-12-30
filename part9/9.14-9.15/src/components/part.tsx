import React from "react";
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part:React.FC<{ course: CoursePart }> = ({ course }) => {
  const displayParts = (course: CoursePart) => {
    switch (course.name) {
      case "Fundamentals":
        return (<>
          <strong>{course.name}{": "}</strong> 
          {" exercise count: "}<i>{course.exerciseCount}</i>
          {" description: "} <i>{course.description}</i>
          </>
        )
      case "Deeper type usage":
        return (<>
            <strong>{course.name}{": "}</strong> 
            {" exercise count: "}<i>{course.exerciseCount}</i>
            {" description: "}<i>{course.description} </i>
            {" exerciseSubmissionLink: "} <i>{course.exerciseSubmissionLink}</i>
          </>
          )
      case "Using props to pass data":
        return (<>
          <strong>{course.name}{": "}</strong> 
          {" exercise count: "}<i>{course.exerciseCount}</i>
          {" project count: "}<i>{course.groupProjectCount}</i>
          </>
        )
      case "My custom course addition":
        return (<>
          <strong>{course.name}{": "}</strong> 
          {" exercise count: "}<i>{course.exerciseCount}</i>
          {" description: "}<i>{course.description}</i>
          </>
        )
      default:
        return assertNever(course);
    }
  }

  return (
    <div>
      {displayParts(course)}
    </div>
    
  )
};


export default Part;