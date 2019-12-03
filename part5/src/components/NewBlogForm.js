import React from 'react';

const NewBlogForm = ({
  handleSubmit,
  title,
  author,
  url,
  setUrl,
  setAuthor,
  setTitle
}) => {
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={e => handleSubmit(e, title, author, url)}>
        <div>
          <label htmlFor="username">title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="author">url:</label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
