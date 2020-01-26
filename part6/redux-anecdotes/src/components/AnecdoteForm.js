import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ addAnecdote, timerId, setNotification }) => {
  const submitAnecdote = async e => {
    e.preventDefault();
    const newAnecdote = e.target.anecdote.value;
    addAnecdote(newAnecdote);
    setNotification(`you added ${newAnecdote}`, 5, timerId);
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
  timerId: state.notification.id
});

const mapDispatchToProps = {
  addAnecdote,
  setNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm);
