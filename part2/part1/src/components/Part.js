import React from 'react';

const Part = ({ part: { name, exercises } }) => (
  <li>
    {name} {exercises}
  </li>
);

export default Part;
