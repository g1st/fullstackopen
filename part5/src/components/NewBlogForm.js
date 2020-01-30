import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks';
import { setNotification } from '../store/actions/notificationActions';
import { addBlog } from '../store/actions/blogActions';

const NewBlogForm = ({ user, setError, addBlog, timerId }) => {
  const title = useField('text', 'title');
  const url = useField('text', 'url');
  const author = useField('text', 'author');

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
      console.error(e);
      setError('Bad request');
      setNotification('Bad request', 'error', timerId);
    }
  };

  return (
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
  );
};

const mapStateToProps = state => ({
  timerId: state.notification.id
});

export default connect(mapStateToProps, { addBlog })(NewBlogForm);
