interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseWithDescription {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWithDescription {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseWithDescription {
  name: 'Secrets to completing exercises';
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

export type PartProps = {
  name: string;
  exerciseCount: number;
  description?: string;
  groupProjectCount?: number;
  exerciseSubmissionLink?: string;
};
