import React from "react";
import Part from "./part";
import { CoursePart } from '../types';

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => (
  <ul>
    {parts.map((course, i) => (
      <li key={i}> 
        <Part course={course} />
      </li>
    ))}
  </ul>
);
 
 export default Content;