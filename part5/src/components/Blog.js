import React, { useState } from 'react';
import { connect } from 'react-redux';

import blogService from '../services/blogService';
import { setNotification } from '../store/actions/notificationActions';
import { removeBlog } from '../store/actions/blogActions';

const Blog = ({ blog, removeBlog, user, timerId, setNotification }) => {
  // idle, sending, success, error
  const [likeStatus, setLikeStatus] = useState('idle');
  const [removeBlogStatus, setRemoveBlogStatus] = useState('idle');
  const [showMore, setShowMore] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

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

  const toggleInfo = () => {
    setShowMore(!showMore);
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

  const lengthy = (
    <>
      {likeStatus === 'error' ? <p>oops, network error</p> : null}
      <p>{blog.url}</p>
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
    </>
  );

  return (
    <div
      style={{
        border: '1px solid lightgrey',
        margin: '0.25em',
        padding: '0 1em',
        userSelect: 'none'
      }}
    >
      <p
        data-testid="more-info"
        onClick={toggleInfo}
        style={{
          cursor: 'pointer'
        }}
      >
        {blog.title} {blog.author}
      </p>
      {showMore && lengthy}
    </div>
  );
};

const mapStateToProps = state => ({
  timerId: state.notification.id,
  user: state.user
});

export default connect(mapStateToProps, { setNotification, removeBlog })(Blog);
