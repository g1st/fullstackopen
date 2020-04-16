import React from 'react';

interface CoursePart {
  name: string;
  exerciseCount: number;
}

// commented out few different methods to achieve the same typings result
// interface CourseParts {
//   courseParts: CoursePart[];
// }

// const Content: React.FC<CourseParts> = (props) => {
// const Content: React.FC<{ courseParts: Array<CoursePart> }> = (props) => {
const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
