import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      <h2>Course Content</h2>
      {courseParts.map((part) => {
        switch (part.name) {
          case 'Fundamentals':
            return (
              <Part
                key={part.name}
                name={part.name}
                exerciseCount={part.exerciseCount}
                description={part.description}
              />
            );
          case 'Using props to pass data':
            return (
              <Part
                key={part.name}
                name={part.name}
                exerciseCount={part.exerciseCount}
                groupProjectCount={part.groupProjectCount}
              />
            );

          case 'Deeper type usage':
            return (
              <Part
                key={part.name}
                name={part.name}
                exerciseCount={part.exerciseCount}
                description={part.description}
                exerciseSubmissionLink={part.exerciseSubmissionLink}
              />
            );
          case 'Secrets to completing exercises':
            return (
              <Part
                key={part.name}
                name={part.name}
                exerciseCount={part.exerciseCount}
                description={part.description}
              />
            );
          default:
            return assertNever(part);
        }
      })}
    </div>
  );
};

export default Content;
