import React from 'react';
import { connect } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import {
  addNotification,
  removeNotification
} from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteList = ({
  addNotification,
  removeNotification,
  addVote,
  anecdotes,
  timerId
}) => {
  const vote = async anecdote => {
    clearTimeout(timerId);
    addVote(anecdote.id);
    await anecdoteService.addVote(anecdote);
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
