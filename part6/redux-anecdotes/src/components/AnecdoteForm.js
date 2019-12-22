import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import {
  addNotification,
  removeNotification
} from '../reducers/notificationReducer';

const AnecdoteForm = ({
  addAnecdote,
  id,
  addNotification,
  removeNotification
}) => {
  const submitAnecdote = e => {
    e.preventDefault();
    clearTimeout(id);
    const timerId = setTimeout(() => {
      removeNotification();
    }, 5000);
    addAnecdote(e.target.anecdote.value);
    addNotification(e.target.anecdote.value, 'ANECDOTE', timerId);
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

const mapStateToProps = state => ({
  id: state.notification.id
});

const mapDispatchToProps = {
  addAnecdote,
  addNotification,
  removeNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm);
