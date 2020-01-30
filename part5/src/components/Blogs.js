import React from 'react';
import Blog from './Blog';
import { connect } from 'react-redux';

const Blogs = ({ blogs }) => (
  <div className="blogs">
    {blogs.map((blog, id) => (
      <Blog blog={blog} key={id + blog.title} />
    ))}
  </div>
);

const sortByLikes = blogs =>
  blogs.sort((firstBlog, nextBlog) => nextBlog.likes - firstBlog.likes);

const mapStateToProps = state => ({
  blogs: sortByLikes(state.blogs)
});

export default connect(mapStateToProps)(Blogs);
