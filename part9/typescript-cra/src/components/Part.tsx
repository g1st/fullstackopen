import React from 'react';
import { PartProps } from '../types';

const Part: React.FC<PartProps> = ({
  name,
  exerciseCount,
  description,
  exerciseSubmissionLink,
  groupProjectCount,
}) => {
  return (
    <div>
      <p>
        <strong>{name}</strong> {exerciseCount}
      </p>
      {description && <p>Info: {description}</p>}
      {groupProjectCount && <p>Group projects: {groupProjectCount}</p>}
      {exerciseSubmissionLink && <p>Submit here: {exerciseSubmissionLink}</p>}
    </div>
  );
};

export default Part;
