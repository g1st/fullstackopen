import React from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer';
import {
  addNotification,
  removeNotification
} from '../reducers/notificationReducer';

const AnecdoteForm = ({ store }) => {
  const submitAnecdote = e => {
    e.preventDefault();
    store.dispatch(addAnecdote(e.target.anecdote.value));
    store.dispatch(addNotification(e.target.anecdote.value, 'ANECDOTE'));
    setTimeout(() => {
      store.dispatch(removeNotification());
    }, 5000);
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
