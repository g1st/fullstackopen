import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Blogs = ({ blogs }) => (
  <div className="blogs">
    <ul>
      {blogs.map((blog, id) => (
        <li key={id + blog.title} data-cy="blog-link">
          <Link to={`/blogs/${blog.id}`}>
            <div className="my-2 rounded-full border-solid border-2 border-black-700 hover:bg-red-800">
              <div className="ml-6 py-2 hover:text-white">{blog.title}</div>
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
