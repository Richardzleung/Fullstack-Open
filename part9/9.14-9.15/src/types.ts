interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface MyNewCoursePart extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends MyNewCoursePart {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends MyNewCoursePart {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface OwnCoursePart {
  name: "My custom course addition";
  exerciseCount: number;
  description: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | OwnCoursePart;
