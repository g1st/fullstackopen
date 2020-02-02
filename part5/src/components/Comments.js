import React from 'react';
import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
  return (
    <>
      <h4>comments</h4>
      <CommentForm id={blog.id} />
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
