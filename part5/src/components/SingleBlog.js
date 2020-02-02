import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import blogService from '../services/blogService';
import { setNotification } from '../store/actions/notificationActions';
import { removeBlog } from '../store/actions/blogActions';
import Comments from './Comments';

const SingleBlog = ({ blogs, removeBlog, user, timerId, setNotification }) => {
  // idle, sending, success, error
  const [likeStatus, setLikeStatus] = useState('idle');
  const [removeBlogStatus, setRemoveBlogStatus] = useState('idle');
  const [likes, setLikes] = useState(0);
  const { id } = useParams();

  let blog;
  if (blogs.length > 0) {
    blog = blogs.filter(blog => blog.id === id)[0];
  }
  const handleLikeClick = async () => {
    setLikeStatus('sending');
    try {
      await blogService.sendLike(blog.id, likes);
      setLikes(likes + 1);
      setLikeStatus('success');
    } catch (e) {
      setLikeStatus('error');
    }
  };

  const handleRemove = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      setRemoveBlogStatus('sending');
      try {
        await blogService.removeBlog(blog.id);
        removeBlog(blog.id);
        setRemoveBlogStatus('success');
        setNotification(`${blog.title} REMOVED`, 'error', timerId);
      } catch (e) {
        if (e.message && e.message.includes('401')) {
          alert('You are unauthorized to remove this message');
        }
        setRemoveBlogStatus('error');
      }
    }
  };
  return user && blog ? (
    <>
      {likeStatus === 'error' ? <p>oops, network error</p> : null}
      <h1>{blog.title}</h1>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        likes: {likes}{' '}
        <button onClick={handleLikeClick} disabled={likeStatus === 'sending'}>
          like
        </button>
      </p>
      <p>added by {blog.user.length > 0 && blog.user[0].name}</p>
      {blog.user.length > 0 && blog.user[0].id === user.id ? (
        <button
          onClick={handleRemove}
          disabled={removeBlogStatus === 'sending'}
          style={{ backgroundColor: 'skyblue' }}
        >
          remove
        </button>
      ) : null}
      <Comments blog={blog} />
    </>
  ) : null;
};

const mapStateToProps = state => ({
  timerId: state.notification.id,
  user: state.user
});

export default connect(mapStateToProps, { setNotification, removeBlog })(
  SingleBlog
);
