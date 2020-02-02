import React from 'react';
import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
  return (
    <div className="mt-6">
      <h4 className="text-lg text-center">Comments</h4>
      <CommentForm id={blog.id} />
      <ul className="list-decimal ml-4 mt-2">
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
