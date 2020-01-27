import React from 'react';

const NewBlogForm = ({ handleSubmit, title, author, url }) => {
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

export default NewBlogForm;
