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
  filter,
  anecdotes,
  timerId
}) => {
  const vote = (id, anecdote) => {
    clearTimeout(timerId);
    addVote(id);
    const timer = setTimeout(() => {
      removeNotification();
    }, 5000);
    addNotification(anecdote, 'VOTE', timer);
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
  filter: state.filter,
  timerId: state.notification.id
});

const mapDispatchToProps = dispatch => {
  return {
    addVote: id => {
      dispatch(addVote(id));
    },
    addNotification: (anecdote, type, id) => {
      dispatch(addNotification(anecdote, type, id));
    },
    removeNotification: () => {
      dispatch(removeNotification());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
