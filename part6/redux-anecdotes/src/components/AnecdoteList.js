import React from 'react';
import { connect } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import {
  addNotification,
  removeNotification
} from '../reducers/notificationReducer';

const AnecdoteList = ({
  addNotification,
  removeNotification,
  addVote,
  anecdotes,
  timerId
}) => {
  const vote = async anecdote => {
    clearTimeout(timerId);
    addVote(anecdote);
    const timer = setTimeout(() => {
      removeNotification();
    }, 5000);
    addNotification(anecdote.content, 'VOTE', timer);
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
  addNotification,
  removeNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
