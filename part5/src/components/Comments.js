import React from 'react';

const Comments = ({ blog }) => {
  return (
    <>
      <h4>comments</h4>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
