import React from "react";

interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Total: React.FC<{ parts: ContentProps[] }> = ({ parts }) => (
  <div>
    Number of exercises:{" "}
    {parts.reduce((carry:number, part:ContentProps) => carry + part.exerciseCount, 0)}
  </div>
);
 
 export default Total;