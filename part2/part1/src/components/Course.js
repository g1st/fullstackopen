import React from 'react';
import Part from './Part';

const Course = ({ course: { parts, name } }) => {
  const rows = parts.map(part => <Part key={part.id} part={part} />);

  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0);

  return (
    <>
      <h1>{name}</h1>
      <ul>{rows}</ul>
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </>
  );
};

export default Course;
