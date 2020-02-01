import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const User = ({ blogs }) => {
  let { id } = useParams();
  const filteredBlogs = filterById(blogs, id);
  const addedBlogs =
    filteredBlogs.length > 0 ? (
      <div>
        <h3>added blogs</h3>
        <ul>
          {filteredBlogs.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    ) : (
      <div>no blogs found associated to id {id}</div>
    );
  return addedBlogs;
};
const filterById = (blogs, id) => {
  return blogs.filter(blog => blog.user[0].id === id);
};

const mapStateToProps = state => ({
  blogs: state.blogs
});

export default connect(mapStateToProps)(User);
