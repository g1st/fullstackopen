import React from 'react';

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div data-testid="titleDiv">
      {blog.title} {blog.author}
    </div>
    <div data-testid="likesDiv">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
);

export default SimpleBlog;
