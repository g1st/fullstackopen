import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Blogs = ({ blogs }) => (
  <div className="blogs">
    <ul
      style={{
        listStyleType: 'none',
        margin: 0,
        padding: 0
      }}
    >
      {blogs.map((blog, id) => (
        <li key={id + blog.title}>
          <Link to={`/blogs/${blog.id}`}>
            <div
              style={{
                border: '1px solid lightgrey',
                margin: '0.25em',
                padding: '0 1em',
                userSelect: 'none',
                cursor: 'pointer'
              }}
            >
              {blog.title}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const sortByLikes = blogs =>
  blogs.sort((firstBlog, nextBlog) => nextBlog.likes - firstBlog.likes);

const mapStateToProps = state => ({
  blogs: sortByLikes(state.blogs)
});

export default connect(mapStateToProps)(Blogs);
