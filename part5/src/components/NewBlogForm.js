import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks';
import { setNotification } from '../store/actions/notificationActions';
import { addBlog } from '../store/actions/blogActions';
import Togglable from './Togglable';

const NewBlogForm = ({ user, setNotification, addBlog, timerId }) => {
  const title = useField('text', 'title');
  const url = useField('text', 'url');
  const author = useField('text', 'author');
  const blogFormRef = useRef();

  const clearBlogForm = () => {
    author.reset();
    title.reset();
    url.reset();
  };

  const handleSubmit = async (event, title, author, url) => {
    event.preventDefault();
    try {
      await addBlog({
        title,
        author,
        url,
        token: user.token
      });

      clearBlogForm();
      setNotification(`a new blog ${title} added`, '', timerId);
    } catch (e) {
      setNotification('Bad request', 'error', timerId);
    }
  };

  return (
    <Togglable buttonLabel="new blog post" ref={blogFormRef}>
      <div>
        <h3>create new</h3>
        <form
          onSubmit={e => handleSubmit(e, title.value, author.value, url.value)}
        >
          <div>
            <label htmlFor="username">title:</label>
            <input
              id="title"
              type={title.type}
              name={title.name}
              value={title.value}
              onChange={title.onChange}
              required
            />
          </div>
          <div>
            <label htmlFor="author">author:</label>
            <input
              id="author"
              type={author.type}
              name={author.name}
              value={author.value}
              onChange={author.onChange}
              required
            />
          </div>
          <div>
            <label htmlFor="author">url:</label>
            <input
              id="url"
              type={url.type}
              name={url.name}
              value={url.value}
              onChange={url.onChange}
              required
            />
          </div>
          <button id="create" type="submit">
            create
          </button>
        </form>
      </div>
    </Togglable>
  );
};

const mapStateToProps = state => ({
  timerId: state.notification.id,
  user: state.user
});

export default connect(mapStateToProps, { addBlog, setNotification })(
  NewBlogForm
);
