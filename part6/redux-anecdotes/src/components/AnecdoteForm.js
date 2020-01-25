import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import {
  addNotification,
  removeNotification
} from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = ({
  addAnecdote,
  id,
  addNotification,
  removeNotification
}) => {
  const submitAnecdote = async e => {
    e.preventDefault();
    clearTimeout(id);
    const timerId = setTimeout(() => {
      removeNotification();
    }, 5000);
    const newAnecdote = await anecdoteService.createNew(
      e.target.anecdote.value
    );
    addAnecdote(newAnecdote);
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
