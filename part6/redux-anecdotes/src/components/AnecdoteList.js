import React from 'react';
import { connect } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import {
  addNotification,
  removeNotification
} from '../reducers/notificationReducer';

const AnecdoteList = ({ store, filter, anecdotes }) => {
  const vote = (id, anecdote) => {
    store.dispatch(addVote(id));
    store.dispatch(addNotification(anecdote));
    setTimeout(() => {
      store.dispatch(removeNotification());
    }, 5000);
  };

  const isFilterSet = filter.active;
  const sortedAnecdotes = anecdotes.sort((el1, el2) => {
    if (el1.votes <= el2.votes) return 1;
    return -1;
  });

  const displayAnecdotes = isFilterSet ? filter.anecdotes : sortedAnecdotes;

  return displayAnecdotes.map(anecdote => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content)}>
          vote
        </button>
      </div>
    </div>
  ));
};

const mapStateToProps = state => ({
  anecdotes: state.anecdotes,
  filter: state.filter
});

export default connect(mapStateToProps)(AnecdoteList);
