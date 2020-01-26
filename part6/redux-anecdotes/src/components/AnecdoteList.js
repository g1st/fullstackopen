import React from 'react';
import { connect } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({ setNotification, addVote, anecdotes, timerId }) => {
  const vote = async anecdote => {
    addVote(anecdote);
    setNotification(`you voted ${anecdote.content}`, 5, timerId);
  };

  return anecdotes.map((anecdote, i) => (
    <div key={i}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

const anecdotesToShow = (anecdotes, filter) => {
  const isFilterSet = filter.active;
  const sortedAnecdotes = anecdotes.sort((el1, el2) => {
    if (el1.votes <= el2.votes) return 1;
    return -1;
  });

  const displayAnecdotes = isFilterSet ? filter.anecdotes : sortedAnecdotes;

  return displayAnecdotes;
};

const mapStateToProps = state => ({
  anecdotes: anecdotesToShow(state.anecdotes, state.filter),
  timerId: state.notification.id
});

const mapDispatchToProps = {
  addVote,
  setNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
