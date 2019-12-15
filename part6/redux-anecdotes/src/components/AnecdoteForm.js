import React from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = ({ store }) => {
  const submitAnecdote = e => {
    e.preventDefault();
    store.dispatch(addAnecdote(e.target.anecdote.value));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={submitAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
