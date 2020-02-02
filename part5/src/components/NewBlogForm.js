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
        <form
          onSubmit={e => handleSubmit(e, title.value, author.value, url.value)}
        >
          <div>
            <label htmlFor="username" />
            <input
              className="mb-2 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              placeholder="Title"
              id="title"
              type={title.type}
              name={title.name}
              value={title.value}
              onChange={title.onChange}
              required
            />
          </div>
          <div>
            <label htmlFor="author" />
            <input
              className="mb-2 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              placeholder="Author"
              id="author"
              type={author.type}
              name={author.name}
              value={author.value}
              onChange={author.onChange}
              required
            />
          </div>
          <div>
            <label htmlFor="url" />
            <input
              className="mb-2 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              placeholder="URL"
              id="url"
              type={url.type}
              name={url.name}
              value={url.value}
              onChange={url.onChange}
              required
            />
          </div>

          <button
            className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            id="create"
            type="submit"
          >
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
